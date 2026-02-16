# 🧠 Feature Backlog & Ideas

**Goal:** Transform `dscrd.wtf` from a Link-in-Bio tool into a "Server Operating System."

## 1. 🛡️ Integrated Forms Engine

**Concept:** Replace Google Forms/Dyno/Appeal.gg with native, auth-aware forms. **Route:** `dscrd.wtf/[server_slug]/[form_slug]` (e.g., `/chill/ban-appeal`)

### The Logic

1. **Auth First:** User _must_ log in via Discord to view the form.
   - _Benefit:_ We instantly know their User ID, Account Age, and Avatar. No "What is your ID?" fields.
   - _Anti-Spam:_ Prevent alt-accounts (e.g., "Account must be > 30 days old").

2. **Fields:**
   - Text, Textarea, Select, Checkbox.
   - "Proof" Upload (Image hosting).

3. **Delivery:**
   - **Webhook:** Sends a nice Embed to a private staff channel in Discord.
   - **Dashboard:** Stored in the database for later review.

4. **Privacy (GDPR):**
   - Since the submission is tied to a User ID, if they delete their `dscrd.wtf` account, we can auto-wipe their form submissions.

### Monetization

- **Free:** 1 Active Form (Ban Appeal).
- **Plus:** Unlimited Forms (Mod Apps, Event Signups, Feedback).

## 2. 🔭 Server Discovery (The "Disboard Killer")

**Concept:** A server list that prioritizes **Quality & Activity** over "Bump Spam." **Route:** `dscrd.wtf/discovery` (or `/explore`)

### The Ranking Algorithm

Instead of "Last Bumped," rank by a computed **Liveliness Score**:

- _Voice Activity:_ Weighted heavily (shows real humans).
- _Message Velocity:_ Messages per minute (ignoring bot spam).
- _Retention:_ How long do new members stay?

### The "Anti-Scam" Barrier

- **Listing Fee:** To be listed, a server owner must be a **Plus Subscriber** (€2.99/mo) OR pay a **One-Time Listing Fee** (€5.00).
  - _Why:_ Scammers and RAID servers won't pay money. This creates a high-trust environment instantly.
- **NSFW Filter:** Strict categorization.

## 3. ⏰ Timezone Translator (The "Don't Ping Me" Feature)

**Concept:** A smart clock on user profiles to prevent 4 AM pings. **Target:** International staff teams and friends.

### The Logic

1. **User Setting:** User selects their timezone (e.g., `Europe/Berlin`) in the Dashboard.
2. **Visitor View:** When viewing `dscrd.wtf/@dustin`:
   - Calculates the local time offset.
   - **Visual:** "It is currently **04:42 AM** for Dustin." (With Moon icon).
   - **Context:** If time is between 00:00 - 08:00, show a "Likely Asleep" badge.

## 4. 🚪 The Gatekeeper (Friend Request Filter)

**Concept:** Control _who_ can see your Discord contact buttons. **Target:** Streamers, Popular Users, Staff.

### The Logic

This feature directly controls the **"Add Friend"** and **"Open Profile"** buttons on the `dscrd.wtf` page.

1. **Conditions:** User sets requirements in Dashboard:
   - [ ] Show to everyone (Default).
   - [ ] Show only if logged into `dscrd.wtf`.
   - [ ] Show only if accounts share a mutual server (Requires Bot).
   - [ ] **"Checklist Mode"**: Visitor must click "I agree to not spam" checkbox to reveal the button.
   - [ ] **"Social Battery Dead"**: Hides buttons entirely. Shows "DMs Closed" status instead.

2. **The Result:** Drastically reduces low-effort spam friend requests while keeping the profile public.
