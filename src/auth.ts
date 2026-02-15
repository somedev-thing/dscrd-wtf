import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "@/lib/mongodb"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: "https://discord.com/api/oauth2/authorize?scope=identify+guilds",
    })
  ],
  adapter: MongoDBAdapter(client),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub!
        // @ts-ignore
        session.user.flags = token.flags
        // @ts-ignore
        session.user.username = token.username
        // @ts-ignore
        session.user.accessToken = token.accessToken
        // @ts-ignore
        session.user.banner = token.banner
        // @ts-ignore
        session.user.accent_color = token.accent_color
      }
      return session
    },
    async jwt({ token, profile, account }) {
      if (profile) {
        token.flags = profile.flags
        token.username = profile.username
        token.premium_type = profile.premium_type
        // @ts-ignore
        token.banner = profile.banner
        // @ts-ignore
        token.accent_color = profile.accent_color
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
  pages: {
    error: '/auth/error',
  }
})
