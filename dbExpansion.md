# Goal: Finalize Sign-In and Sign-Up Backend Flows

Now that GitHub OAuth is fully working with Supabase, we need to wire up the rest of the authentication providers (Google and Email/Password) and connect them to your UI.

## User Review Required

> [!WARNING]
> **Google OAuth Credentials**
> To make the Google Sign-In work, you will need to create a `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in the Google Cloud Console (similar to what you did for GitHub). Are you ready to set those up?

> [!IMPORTANT]
> **Password Storage**
> NextAuth's default Email provider uses "Magic Links" (passwordless). Since your UI specifically includes Password fields, we must use the **Credentials Provider**. This requires us to add a `password_hash` column to the database and use `bcrypt` to securely store passwords. 

## Proposed Changes

---

### Database Update
We will need to run one final small SQL script to add a password column to the users table:
```sql
ALTER TABLE next_auth.users ADD COLUMN IF NOT EXISTS password_hash VARCHAR;
```

---

### Dependencies
- **[NEW]** We need to install `bcryptjs` and its types (`@types/bcryptjs`) to securely hash and compare passwords.

---

### Auth Configuration

#### [MODIFY] `auth.ts`
- Import and add the `Google` provider.
- Import and add the `Credentials` provider.
- Write the `authorize` logic for the Credentials provider to:
  1. Find the user by email in Supabase.
  2. Compare the entered password with the stored `password_hash` using `bcryptjs`.

---

### Server Actions

#### [MODIFY] `app/sign-in/actions.ts`
- Add `signInWithGoogle` action.
- Add `signInWithCredentials(formData)` action.
- Add `signUpWithCredentials(formData)` action (hashes password and inserts into `next_auth.users`).

---

### UI Integration

#### [MODIFY] `app/sign-in/page.tsx`
- Change the Google button to use a `<form action={signInWithGoogle}>`.
- Change the Email/Password form to use `<form action={signInWithCredentials}>`.
- Add error handling (e.g. invalid password).

#### [MODIFY] `app/sign-up/page.tsx`
- Change the Google button to use a `<form action={signInWithGoogle}>`.
- Change the Email/Password form to use `<form action={signUpWithCredentials}>`.
- Add validation to ensure the Password and Confirm Password fields match before submitting.

## Verification Plan

### Manual Verification
1. We will test the Google Sign-Up and verify it redirects to the dashboard.
2. We will test creating a brand new account using an Email and Password.
3. We will log out, and test signing back in with that exact Email and Password.
4. We will test entering a wrong password to ensure the app correctly rejects it.
