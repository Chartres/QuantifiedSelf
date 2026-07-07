# Deploying Tělo — Cloudflare Pages behind Access (passkey login, no codes)

Goal: `telo.dravec.org`, private to Pavol, login = one tap with a passkey (no
copy-pasting email codes). Data note: entries and photos live in the browser's
local storage on the device — the hosting only serves the app code.

## Why Google as the Access identity provider

Cloudflare Access has no native passkey login; its built-in option is email OTP
(the codes we're avoiding). The trick: use **Login with Google** as the IdP —
Pavol's Google account already uses passkeys, so the flow becomes "tap → Face ID /
fingerprint → in". Same $0, no codes.

## Owner steps (~10 min, Cloudflare dashboard — or hand this file to the mini's Claude with a CF API token)

1. **Pages project**: Workers & Pages → Create → Pages → connect the
   `Chartres/QuantifiedSelf` repo → build command `npm run build`, output `dist`,
   production branch `master`. (Or skip repo-connect and use the GitHub Action in
   `.github/workflows/deploy.yml` — it needs `CLOUDFLARE_API_TOKEN` +
   `CLOUDFLARE_ACCOUNT_ID` repo secrets.)
2. **Domain**: Pages project → Custom domains → `telo.dravec.org` (zone already on CF).
3. **Google IdP**: Zero Trust → Settings → Authentication → Add Google.
   (Google Cloud console: create OAuth client, authorized redirect
   `https://<team>.cloudflareaccess.com/cdn-cgi/access/callback`; paste client
   id/secret into CF.)
4. **Access application**: Zero Trust → Access → Applications → Add → Self-hosted →
   domain `telo.dravec.org` → policy Allow: Emails = pavol@dravecky.sk (+ gmail if
   used for Google login) → login methods: Google only (untick One-time PIN).
   Session duration: 1 month (so the phone rarely re-asks).
5. Open `telo.dravec.org` on the phone → Google → passkey → Add to Home Screen.

## Verify

- Incognito hit on the URL → Google login wall (not the app).
- After login: app loads; add an entry; kill the tab; reopen → entry persists
  (device storage, survives Access re-auth).
