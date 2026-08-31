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

## Local (PC) sessions: hold commits until asked

When working from a local checkout on the user's PC (as opposed to a cloud/
remote session), do not commit, push, or open a PR right after making a
change — the user wants to review it locally first (e.g. in the dev server
or IDE). Make the edit, verify it builds/lints, and stop there. Only commit,
push, and open the PR once the user explicitly asks (e.g. "コミットして",
"プルリクエストを作成して"). The auto-merge-on-green-CI policy above still
applies once a PR is actually opened.
