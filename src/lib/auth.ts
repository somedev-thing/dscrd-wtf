import type { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import dbConnect from '@/lib/db';
import UserModel from '@/lib/models/User';
import AccountModel from '@/lib/models/Account';

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'identify email guilds',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user, account }) {
      await dbConnect();

      // Find or create user
      let dbUser = await UserModel.findOne({ email: user.email });

      if (!dbUser) {
        dbUser = await UserModel.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: 'user',
          tier: 'lurker',
          slugs: [],
          profile: {
            bio: '',
            theme: 'void',
            socials: [],
            customCss: '',
          },
        });
      } else {
        // Update avatar on each login
        dbUser.image = user.image || dbUser.image;
        dbUser.name = user.name || dbUser.name;
        await dbUser.save();
      }

      // Upsert account
      if (account) {
        await AccountModel.findOneAndUpdate(
          {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
          {
            userId: dbUser._id,
            type: account.type,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            refresh_token: account.refresh_token,
            access_token: account.access_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state as string | undefined,
          },
          { upsert: true, new: true }
        );
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        await dbConnect();
        const dbUser = await UserModel.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.tier = dbUser.tier;
          token.slugs = dbUser.slugs;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.id;
        (session.user as Record<string, unknown>).role = token.role;
        (session.user as Record<string, unknown>).tier = token.tier;
        (session.user as Record<string, unknown>).slugs = token.slugs;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
