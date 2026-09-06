@AGENTS.md

# Pull request workflow

- After opening a PR against `main`, wait for CI (`.github/workflows/ci.yml`) to finish.
  If it's green and there are no merge conflicts, merge it without asking for
  confirmation first. Still stop and ask if CI fails, a human reviewer leaves a
  comment that needs a judgment call, or the change is otherwise ambiguous.
- After merging, a push to `main` triggers `.github/workflows/deploy.yml`
  (Cloud Run deploy) — check that it succeeds and report the result.
- The designated working branch is reused across tasks and gets merged into
  `main` repeatedly. Once its PR is merged, fast-forward the local branch onto
  the new `main` (`git fetch origin main && git merge --ff-only origin/main`)
  before starting the next change, then branch further commits from there —
  don't stack new commits on already-merged history.

# Brand assets: mirror to Google Drive

The brand assets are mirrored to Google Drive. **Whenever a brand asset in this
repo is added, changed, or removed, apply the same change to the Drive copy in
the same task** — don't leave the two out of sync, and don't wait to be asked.

- Destination: `10_仕事・プロジェクト (Work)` > `11_素材データ` > `OinariTech`
  (folder id `1X6F119wYDh7bc6wl1Q5Nne5J95TuhZwM`)
- Mirrored files: everything in `public/brand/`, plus `src/app/favicon.ico`,
  `src/app/apple-icon.png`, and `src/app/opengraph-image.png`
- `src/app/icon.svg` is byte-identical to `public/brand/fox-mark.svg`, so only
  the latter is uploaded. Re-check this if either file changes.
- Updating an existing file means uploading the new content and trashing the old
  entry — `mcp__Google_Drive__update_file` only changes title/parent, not bytes.

Uploads go through `mcp__Google_Drive__create_file` with `base64Content`,
`contentMimeType`, and `disableConversionToGoogleType: true`.

**Verify every upload.** Base64 has to be transcribed by hand into the tool call,
and a silent truncation there already corrupted one file (a 3,678-byte
`favicon.ico` arrived as 2,864 bytes). Before uploading, write the transcribed
string to a file, decode it, and `cmp` it against the original; after uploading,
confirm the returned `fileSize` matches. Splitting the base64 into ~1,200-char
chunks (`split -n`) makes transcription far more reliable. Files around 30KB+
(e.g. `opengraph-image.png`, ~43,000 base64 chars) are not reliably transcribable
— hand those to the user with `SendUserFile` for manual upload instead of
uploading something corrupt.

# Admin page (`/admin`)

`/admin` lets the site owner edit product info (title, badge, card/page copy)
and toggle whether a product shows up at all, without a code change. It's a
dynamically-rendered (`export const dynamic = "force-dynamic"`) part of the
Next.js app, not a separate service.

- **Auth**: Google OAuth (`src/lib/google-oauth.ts`), restricted to a single
  hardcoded address in `src/lib/admin-session.ts` (`ADMIN_EMAIL`) — deliberately
  not an env var, so a missing/misconfigured env var can't accidentally open
  admin access to anyone. The session is a signed (`jose`) HttpOnly cookie;
  `src/proxy.ts` does the optimistic redirect-to-login check for `/admin/*`,
  and every admin Server Action/page re-checks via `verifyAdminSession()`.
- **Data**: Firestore (`src/lib/firestore.ts`, `@google-cloud/firestore`),
  collection `products`, one document per product id. `src/lib/products.ts`
  falls back to hardcoded defaults if Firestore is unreachable or a document
  doesn't exist yet — the public site must never break because Firestore
  isn't provisioned or is temporarily down.
- **Runtime env vars** (set via Secret Manager in `deploy.yml`, not build
  args — these are server-only secrets and must never reach the client
  bundle): `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`,
  `SESSION_SECRET` (a random 32+ byte string, e.g. `openssl rand -base64 32`).

## Manual GCP setup required (cannot be done from a coding session)

The following one-time steps happen in the Google Cloud / Google Cloud Console
outside this repo, and are prerequisites for `/admin` to work in production:

1. **Firestore**: enable the Firestore API (Native mode) for the project, and
   grant the Cloud Run service's runtime service account the "Cloud Datastore
   User" (`roles/datastore.user`) IAM role.
2. **OAuth client**: in Google Cloud Console → APIs & Services → Credentials,
   create an OAuth 2.0 Client ID (Web application) for the admin login.
   Authorized redirect URI: `https://<production-domain>/api/auth/google/callback`.
3. **Secret Manager**: create secrets named `GOOGLE_OAUTH_CLIENT_ID`,
   `GOOGLE_OAUTH_CLIENT_SECRET`, and `SESSION_SECRET` with the values from
   steps 1–2 above, and grant the GitHub Actions deploy service account
   (`secrets.GCP_SERVICE_ACCOUNT`) and the Cloud Run runtime service account
   "Secret Manager Secret Accessor" (`roles/secretmanager.secretAccessor`) on
   each. `deploy.yml` references them by name; nothing else to change there
   once they exist.

Until these are done, `/admin/login` will error on submit and the public
product pages will silently show their hardcoded defaults (by design) instead
of Firestore-edited content.

## Local (PC) sessions: hold commits until asked

When working from a local checkout on the user's PC (as opposed to a cloud/
remote session), do not commit, push, or open a PR right after making a
change — the user wants to review it locally first (e.g. in the dev server
or IDE). Make the edit, verify it builds/lints, and stop there. Only commit,
push, and open the PR once the user explicitly asks (e.g. "コミットして",
"プルリクエストを作成して"). The auto-merge-on-green-CI policy above still
applies once a PR is actually opened.
