import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  }
})
