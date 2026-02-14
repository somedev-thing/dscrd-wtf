import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [Discord],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = user.id
        // @ts-ignore - we need to type this properly later, but for now we pass it through
        session.user.flags = token?.flags || user?.flags
        // @ts-ignore
        session.user.username = token?.username || user?.username
      }
      return session
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.flags = profile.flags
        token.username = profile.username
        token.premium_type = profile.premium_type
      }
      return token
    }
  },
})
