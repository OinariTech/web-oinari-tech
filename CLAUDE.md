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

## Local (PC) sessions: hold commits until asked

When working from a local checkout on the user's PC (as opposed to a cloud/
remote session), do not commit, push, or open a PR right after making a
change — the user wants to review it locally first (e.g. in the dev server
or IDE). Make the edit, verify it builds/lints, and stop there. Only commit,
push, and open the PR once the user explicitly asks (e.g. "コミットして",
"プルリクエストを作成して"). The auto-merge-on-green-CI policy above still
applies once a PR is actually opened.
