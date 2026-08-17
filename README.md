# SafeSync (free, no-build clone)

A visual + functional recreation of the SafeSync incident log app, built with plain React (via CDN, no npm/build step) and Tailwind CDN. All data is stored in your browser's `localStorage` — there's no backend, no account, no paid plan, and no "Edit with ___" badge.

## Run it — no install needed

1. Unzip this folder.
2. Double-click `index.html` (or right-click → Open with → your browser).

That's it. It runs entirely in your browser using CDN-hosted React/Tailwind, so you do need an internet connection the first time you open it (to fetch those libraries), but no server, Node, or build step is required.

## Demo logins

| Role | Email | Password |
|---|---|---|
| Admin | admin@safesync.demo | admin123 |
| Manager | manager@safesync.demo | manager123 |
| Reporter | reporter@safesync.demo | reporter123 |

You can also register a brand-new account from the login screen — new accounts default to the Reporter role, same as the original app.

## What's included

- Login / Register
- Incident Log (company-wide view — Manager & Admin only)
- My Reports (each user's own submissions)
- Report Incident (full form, auto-generated `INC-YYYYMMDD-HHMMSS` number, all 33 incident types, photo attachment name)
- Incident Detail + Review workflow (status update, reviewer notes — Manager & Admin only)
- Master Data (manage Incident Types & Locations — Admin only)
- User Management (invite users, change roles, live Role Permissions matrix — Admin only)

## Data persistence

Everything (users, incidents, master data, permissions) is saved in your browser's `localStorage` under the key `safesync_db_v1`. It will persist across reloads on the same browser/device, but:
- It's local to one browser — it won't sync across devices.
- Clearing your browser's site data will reset it back to the seeded demo data.
- Passwords are stored in plain text in your browser — this is a demo/prototype, not something to put real credentials or real incident data into.

## Put it online for free (optional)

If you want a shareable public link instead of just opening the file locally, the easiest no-login option is **Netlify Drop**:

1. Go to https://app.netlify.com/drop in your browser.
2. Drag this whole folder (or just `index.html` + `app.js`) onto the page.
3. Netlify gives you an instant public URL — no account required for this.

Other free options that work just as well since this is a static site: GitHub Pages, Vercel, Cloudflare Pages, or Surge.sh.
