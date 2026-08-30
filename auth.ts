import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { SupabaseAdapter } from "@auth/supabase-adapter"

const useSupabase = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  ...(useSupabase ? {
    adapter: SupabaseAdapter({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    })
  } : {}),
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    }
  }
})
