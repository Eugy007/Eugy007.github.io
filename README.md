# Eugene Wambugu - Portfolio

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## What changed in this revision

This is an iteration on the original build, not a rebuild. Summary of the changes:

- Real content throughout, sourced from the CV: name, title, contact details
  (including phone), education (KCA University), and both real employment
  entries (Kingdom Bank, IEBC).
- Removed the duplicate CV button (was in the nav, hero, and about section).
  There is now exactly one: in the hero.
- Removed the glowing/pulsing dot decorations (nav logo, availability badge,
  HUD indicator). Status dots are now flat, no animation or glow.
- Added a short preloader (dark screen, icons stagger in, welcome message,
  site URL, then reveals the page). Respects `prefers-reduced-motion` by
  skipping straight through.
- Replaced the framed hero photo with a hanging ID-card style photo: white
  frame, dark strap from above, a slight continuous sway. Uses `object-cover`
  so the photo is never stretched.
- Merged the old "Project Portfolio" grid and "Portfolio Showcase" section
  into one "Projects" section with tabs (Projects / Tech Stack), since
  showing the same two projects twice in different layouts was redundant.
  Project cards are now compact teasers; clicking one opens a dedicated
  `/projects/[slug]` case-study page with the full description, stack,
  features, and links.
- Added BuildMart POS as a real project (no fabricated URL, clearly marked
  as in development). Kept InternLinkKE and the Cafe Management System.
- Dropped the nav from 6 items to 5 (Projects, About, Skills, Experience,
  Contact) since Showcase no longer exists as a separate section.
- Removed invented "stats" (like fabricated project counts) in favor of
  real facts (education, location, focus area) or real derived numbers
  (technology count and feature count on each project's own detail page).
- No em dashes anywhere in the visible copy.
- Replaced the hero's static hanging photo with a real 3D physics lanyard
  (`components/HeroLanyard.tsx`): a rope-jointed chain built with
  React Three Fiber + Rapier physics. It sways gently on its own, and you
  can grab and fling the card, watch it swing on the rope, and settle back
  down. Falls back to the original static photo automatically if
  `prefers-reduced-motion` is on, or if WebGL fails for any reason (older
  device, disabled hardware acceleration, etc).

This adds four new dependencies for the lanyard: `three`, `@react-three/fiber`,
`@react-three/drei`, `@react-three/rapier`, and `meshline` (for the rope's
visual strand). `npm install` picks these up automatically, nothing manual
needed. The physics constants (rope segment length, card size, camera
position/fov, damping) are all named constants near the top of
`HeroLanyard.tsx` if you want to tune the feel once you see it live.

## Edit content

Everything editable lives in one file:

```
data/site.ts
```

## Replace the placeholders

Only one thing is still a placeholder graphic:

| What | Where | How |
|---|---|---|
| BuildMart POS screenshot | `public/images/buildmart-pos.svg` | Once you have a real screenshot, replace the file and update the `image` field for `buildmart-pos` in `data/site.ts` |

Your real photo and the InternLinkKE / Cafe Management screenshots should
already be in `public/images/` as `avatar.jpg`, `internlinkke.jpg`, and
`cafe-management.jpg` from the previous round. This zip does not include
those three files (to avoid overwriting your real ones) — copy them back in
from your existing project before running this.

## Deploy

```bash
npm install -g vercel
vercel
```

Your CV lists `eugy007.github.io` as your portfolio URL. If you deploy to
GitHub Pages specifically, this app needs `output: 'export'` in
`next.config.mjs` and a `basePath` matching your repo name, since GitHub
Pages only serves static files. Vercel or Netlify need neither and are the
simplest path if you'd rather not deal with that.

## Project structure

```
app/
  layout.tsx              Root layout: preloader, background, nav, footer
  page.tsx                Home page: assembles the sections
  projects/[slug]/page.tsx  Dedicated case-study page per project
components/               One component per section/piece of UI
data/site.ts               All content, the only file you should need to edit regularly
lib/                        Shared hooks (scroll-spy, reduced-motion)
public/                     Static assets, images, resume.pdf
```
