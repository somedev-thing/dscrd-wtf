# PROJECT MANIFESTO: dscrd.wtf

**Version:** 1.0 (Concept)
**Status:** Active Development
**Domain:** `dscrd.wtf`
**Maintainer:** Dustin (@something-dev)

## 1. THE ELEVATOR PITCH

Discord's native sharing options are hostile. "Copy User ID" (18 digits) is useless to normal humans. `discord.gg` links expire or look suspicious. Linktree is too generic.

**dscrd.wtf** is the **Identity Layer for the Discord Ecosystem.**
It turns cryptic IDs into beautiful, permanent, shareable slugs (`dscrd.wtf/@dustin`) that render rich profile cards, server wikis, and bot invites.

**The Vibe:** "Control Plane." Industrial, high-contrast, void-tech. No cutesy SaaS vectors.

## 2. THE TECH STACK (The "Modern Trashcan" Stack)

*We do not use Docker. We do not use Java. We use things that ship.*

* **Framework:** **Next.js 15 (App Router)**.

  * *Why:* We need Server-Side Rendering (SSR) for dynamic Open Graph images. When a user pastes a link in Discord, the preview card must generate instantly on the server.

* **Database & Auth:** **Supabase**.

  * *Why:* Postgres is king. Auth (Discord OAuth2) is built-in. Realtime is a bonus.

* **Styling:** **Tailwind CSS v4**.

  * *Design Token:* "Antigravity" (Deep blacks, Electric Blue `#0072ff`, sharp borders).

  * *Icons:* **Lineicons** (Webfont).

* **Deployment:** **Vercel**.

  * *Why:* It just works.

* **Image Generation:** **@vercel/og**.

  * *Why:* For generating dynamic PNG previews of profiles on the fly.

## 3. URL ARCHITECTURE (The Router)

*Clean paths. Deep functionality. No trailing slashes.*

### A. The Magic Resolver (Root Level)

* **`/@ [handle]`** → **User Profile Card**

  * *Example:* `dscrd.wtf/@dustin`

  * *Logic:* Fetches live Discord data (Avatar, Status, Banner) + DB overrides (Bio, Socials).

* **`/[slug]`** → **Server Home / Wiki**

  * *Example:* `dscrd.wtf/chill-zone`

  * *Logic:* Renders the Markdown "Home" page for a server community.

* **`/[slug]/[page]`** → **Server Subpage**

  * *Example:* `dscrd.wtf/chill-zone/rules`

* **`[subdomain].dscrd.wtf`** → **Premium Server Routing**

  * *Example:* `chill.dscrd.wtf` maps internally to `/server/chill-zone`.

### B. The Utility Redirects

* **`/bot/[slug]`** → **Smart Redirect**

  * *Example:* `dscrd.wtf/bot/nyra` -> Redirects to Discord OAuth Invite.

  * *Feature:* Tracks click sources (Twitter vs. Reddit) before redirecting.

### C. The Dashboard (Protected)

* **`/dashboard`** → Overview (Stats, Fuel Level).

* **`/dashboard/identity`** → Edit your Profile (Theme, Links, CSS).

* **`/dashboard/servers`** → CMS for Server Pages (Markdown Editor).

* **`/dashboard/analytics`** → Traffic sources and conversion rates.

## 4. BUSINESS MODEL (The "Anti-Greed" Plan)

*Goal: Cover the €24/year domain renewal and Vercel Pro costs. Not buying a yacht.*

### Tier 1: LURKER (Free)

* 1 User Profile Slug (`/@name`).

* 1 Server Page (Home only, no subpages).

* Standard Dark Theme.

* "Powered by dscrd.wtf" badge.

### Tier 2: VERIFIED (€4 / One-Time)

* *The price of a Döner. You own it forever.*

* Unlimited User Slugs.

* **Custom CSS Injection** (The killer feature).

* Remove Branding.

* Animated Banners.

* "Verified" Badge on profile.

### Tier 3: SERVER PRO (€5 / Month)

* *For communities that want a website without building one.*

* **Custom Subdomain** (`myserver.dscrd.wtf`).

* Unlimited Wiki Pages (Rules, Lore, Roles).

* Advanced Analytics (Join conversion tracking).

## 5. KEY FEATURES & SCOPE

### Phase 1 (MVP)

1. **Discord OAuth Login.**

2. **Slug Reservation:** Claim `/@username`.

3. **Profile Rendering:** Fetch Avatar/Banner from Discord API + Render Static Page.

4. **Dynamic OG Images:** Link previews must look sick in Discord chat.

5. **Dashboard V1:** Basic stats and link editing.

### Phase 2 (The "Wiki" Update)

1. **Server CMS:** Markdown editor for server pages.

2. **Subdomain Routing:** Handling `*.dscrd.wtf` requests via Vercel Middleware.

3. **The "Fuel Supply":** Stripe integration for the €4 Verified upgrade.

### Phase 3 (The "Flex" Update)

1. **Custom CSS:** Allow Verified users to inject raw CSS into their profile card.

2. **Themes:** "Cyberpunk", "Void", "Retro" presets.

3. **API:** Allow bot developers to update their `dscrd.wtf` page status programmatically.

## 6. DESIGN SYSTEM (Antigravity)

* **Fonts:**

  * Headings: **Outfit** (Bold, Geometric).

  * UI/Body: **Lexend** (Clean, legible).

  * Code/IDs: **JetBrains Mono** (The developer standard).

* **Colors:**

  * `Void`: `#030303` (Background).

  * `Surface`: `#0e0e0e` (Cards).

  * `Border`: `#222222`.

  * `Electric`: `#0072ff` (Primary Accent).

  * `Fanta`: `#ff9100` (Fuel/Warning).

## 7. DEVELOPER ONBOARDING

1. **Clone:** `git clone` (Main branch only. We live dangerously).

2. **Env:** Copy `.env.example`. You need a Discord App ID and Supabase URL.

3. **Install:** `npm install` (or `pnpm`, or `bun`, just don't use yarn).

4. **Run:** `npm run dev`.

5. **Rule:** If it compiles, ship it.

**Known Issues:**

* Hardware limitation: Developed on a 2015 Mac Pro trashcan. If it runs here, it runs anywhere.
