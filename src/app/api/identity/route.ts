import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Profile from '@/lib/models/Profile';
import Account from '@/lib/models/Account';

async function getDiscordData(userId: string) {
  try {
    const account = await Account.findOne({ userId, provider: 'discord' });
    if (!account) return null;

    // 1. Try Bot Token (Preferred for public data: Avatar, Banner, etc.)
    // Requires DISCORD_BOT_TOKEN in env
    if (process.env.DISCORD_BOT_TOKEN) {
      // account.providerAccountId is the Discord User ID
      const res = await fetch(`https://discord.com/api/users/${account.providerAccountId}`, {
        headers: {
          Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        },
      });
      if (res.ok) return await res.json();
      console.warn('Bot Token fetch failed, falling back to User Token');
    }

    // 2. Fallback to User Token (if available)
    if (account.access_token) {
      const res = await fetch('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });

      if (res.ok) return await res.json();
    }
    
    return null;
  } catch (error) {
    console.error('Discord Fetch Error:', error);
    return null;
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const userId = (session.user as any).id;

  try {
    let profile = await Profile.findOne({ userId });

    // Sync Logic: Check if we need to initial sync or strict sync
    // User requested: "username cannot be set as it will be automatically... import bio and banner"
    // We should try to fetch Discord data to ensure we have the latest handle/bio/banner
    const discordData = await getDiscordData(userId);

    if (discordData) {
      const updateData: any = {
        handle: discordData.username, // Force sync handle
        image: `https://cdn.discordapp.com/avatars/${discordData.id}/${discordData.avatar}.png`,
        displayName: discordData.global_name || discordData.username,
      };

      if (discordData.banner) {
          updateData.banner = `https://cdn.discordapp.com/banners/${discordData.id}/${discordData.banner}.png?size=600`;
          updateData.bannerColor = discordData.banner_color;
      }
      
      if (discordData.bio) {
        // Only update bio if local bio is empty? Or "import" implies overwrite?
        // User said "import bio...". Let's update `discordBio` field or just `bio` if not set?
        // Or maybe strictly sync? "import bio" suggests matching Discord.
        updateData.bio = discordData.bio;
      }

      // Check for custom emojis in bio? User said "grab them too".
      // Discord API returns bio string. Emojis are in there.
      
      profile = await Profile.findOneAndUpdate(
        { userId },
        { 
          $set: updateData,
          $setOnInsert: {
            userId,
            createdAt: new Date(),
          }
        },
        { returnDocument: 'after', upsert: true }
      );
    } else if (!profile) {
        // Fallback if no discord account linked (unlikely for login) or fetch failed
        return NextResponse.json({ error: 'Failed to sync with Discord' }, { status: 500 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Identity GET Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { theme, socials, customColors } = body; 
  // removed handle/bio from PUT as they are synced from Discord (mostly)
  // Actually, user might want to OVERRIDE bio? 
  // User said "import bio". usually implies one-time or sync.
  // But strictly "username cannot be set". Bio might be editable?
  // User: "import bio... if a user has external emojis... grab them".
  // This implies we rely on Discord for Bio.
  // So I will REMOVE bio from PUT for now, or make it optional?
  // Let's assume we ONLY sync bio from Discord for now as requested.

  await dbConnect();

  try {
    const profile = await Profile.findOneAndUpdate(
      { userId: (session.user as any).id },
      { 
        $set: { 
          theme,
          socials, // Allow updating links
          customColors,
          updatedAt: new Date() 
        }
      },
      { returnDocument: 'after' }
    );

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Identity PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
