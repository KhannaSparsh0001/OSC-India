# Open Source Connect India - Next Phase Plans

With the entire frontend UI templated, styled in `var(--orange)`, and fully responsive, Phase 1 (Frontend Foundation) is officially complete. 

The next objective is transitioning this static template into a fully functional, data-driven web application. 

---

## Phase 2: Backend Infrastructure & Database
*The foundation for storing user data, points, and event metrics.*

- [ ] **Initialize Supabase**: Set up a new Supabase project to act as our PostgreSQL database.
- [ ] **Database Schema Design**: 
  - `users`: Core table for GitHub IDs, emails, and roles.
  - `roles`: Role-based access control (`Contributor`, `Mentor`, `Project Admin`).
  - `profiles`: Extended data (avatar, bio, tech stack) linked to their specific role.
  - `contributions`: Tracking PRs, issues, and commits.
  - `leaderboard_stats`: Aggregated points and ranks.
- [ ] **Environment Setup**: Link Next.js environment variables (`.env.local`) to the Supabase instance.

---

## Phase 3: Authentication (GitHub OAuth)
*Allowing developers to log in seamlessly without passwords.*

- [ ] **Install NextAuth.js**: Integrate `next-auth` into the Next.js App Router.
- [ ] **GitHub Application**: Create an OAuth app in GitHub Developer Settings and acquire Client ID & Secret.
- [ ] **Auth Configuration**: Configure the NextAuth GitHub Provider and connect it to the Supabase adapter so users are automatically saved to the database upon login.
- [ ] **Route Protection**: Implement middleware to protect the `/dashboard` route so only authenticated users can access it.

---

## Phase 4: Dynamic Data Integration
*Wiring up the templates we just built to the real database.*

- [ ] **Dynamic Dashboard**: 
  - Fetch the logged-in user's session data and their **Role** (Contributor, Mentor, Project Admin).
  - Populate the Profile Card and adjust the available actions based on their role (e.g., Admins see project management tools, Mentors see mentee requests).
  - Query Supabase for their current rank, streak, and PR distribution.
- [ ] **Role-Based Badge Generator**: 
  - Dynamically render the badge type, title, and color scheme based on whether the user is a `Mentor`, `Admin`, or `Contributor`.
- [ ] **Dynamic Leaderboard**: 
  - Create a server-side query to fetch the top 100 users ordered by points.
  - Dynamically render the Top 3 podium and the remaining list.
- [ ] **GitHub API Polling (Optional but Recommended)**: Set up a cron job or webhook system to automatically fetch and update users' merged PRs from GitHub to update their leaderboard score.

---

## Phase 5: Deployment & CI/CD
*Pushing to production.*

- [ ] **Vercel Deployment**: Connect the GitHub repository to Vercel for automatic deployments on every push.
- [ ] **Environment Variable Sync**: Ensure Supabase and GitHub OAuth keys are securely added to Vercel.
- [ ] **Final Manual Testing**: Run through the mobile layouts, auth flows, and data fetching on the live production URL.
