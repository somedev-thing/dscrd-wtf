# dscrd.wtf

The Identity Layer for Discord Power Users.

![Banner](/dscrd.wtf-logo-full.png)

## Overview

**dscrd.wtf** is a comprehensive platform for managing your digital identity on Discord. It provides:

- **User Profiles (`/@handle`)**: Beautiful, customizable profile cards synced with Discord.
- **Server Pages (`/server/[slug]`)**: Landing pages for your communities.
- **Smart Redirects (`/bot/[slug]`)**: Analytics-driven invite links.
- **Dashboard**: A powerful control plane to manage everything.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Database**: MongoDB (Mongoose)
- **Auth**: NextAuth.js (Discord Provider)
- **Deployment**: Vercel

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (`.env`):
    ```env
    MONGODB_URI=...
    DISCORD_CLIENT_ID=...
    DISCORD_CLIENT_SECRET=...
    NEXTAUTH_SECRET=...
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Project Structure

- `src/app`: App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Database models and utilities.
- `public`: Static assets.

## License

MIT
