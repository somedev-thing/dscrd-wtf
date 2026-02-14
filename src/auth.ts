import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    })
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub!
        // @ts-ignore
        session.user.flags = token.flags
        // @ts-ignore
        session.user.username = token.username
      }
      return session
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.flags = profile.flags
        token.username = profile.username
        token.premium_type = profile.premium_type
      }
      return token
    }
  },
})
