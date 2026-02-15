import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Profile from '@/models/Profile';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  try {
    let profile = await Profile.findOne({ userId: (session.user as any).id });

    if (!profile) {
      // Auto-create profile if missing
      // Default handle: username from Discord (if available) or random string
      // But we need unique handle...
      // For now return null, let UI prompt creation?
      // Or create blank?
      // Let's return 404 and let UI handle "Create Profile" flow
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
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
  const { handle, bio, theme, customColors } = body;

  await dbConnect();

  try {
    // Check handle uniqueness if changing
    if (handle) {
    const userId = (session.user as any).id;
      const existing = await Profile.findOne({ handle });
      if (existing && existing.userId !== userId) {
        return NextResponse.json({ error: 'Handle already taken' }, { status: 409 });
      }
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: (session.user as any).id },
      { 
        $set: { 
          handle, 
          bio, 
          theme,
          customColors,
          updatedAt: new Date() 
        },
        $setOnInsert: {
          userId: (session.user as any).id,
          createdAt: new Date()
        }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(profile);
  } catch (error) {
    console.error('Identity PUT Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
