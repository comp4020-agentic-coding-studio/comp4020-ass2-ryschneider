# Your harness

Rules for whichever agent is working in this repo, kept because each one
traces back to something that actually went wrong or would have gone wrong
unnoticed while building **Splinter** (`SLOP3972`).

## Content order

Write in dependency order, not file-tree order: `course-config.ts` before
anything with a date (sessions, assessments, lectures all validate against its
`startDate`/`endDate`), `people/` before any content that declares
`teachers:` against it. Writing sessions and lectures out of this order
produced a schema failure the first time; writing them in it hasn't since.

## Platform constraints beat literal requests

The course code's last three digits are fixed per-repo and enforced by
`slopCourseMetaSchema` and `spec/assignment-2.test.ts` — they are not a style
choice. If a requested code, date range, or description length conflicts with
a schema constraint, say so explicitly and substitute the closest compliant
value (same level digit, same intent) rather than silently complying with the
literal request or silently overriding it without saying anything.

## Know the real gate

`pnpm check` (typecheck + build + `vitest run spec`) is the gate this repo is
actually held to. `pnpm test:template` (`vitest run scripts`) is a
maintainer-only self-test of the `check-evidence` tooling itself — its
starter-image fixture tests break with `ENOENT` once the starter images are
deleted, which is expected once you've made that deletion a real design
decision, not a regression to chase down.

## A hash diff is not a visual check

`check-evidence` treats any changed or deleted image as passing. That is a
floor, not a review. Render generated images to a viewable format and
actually look at them before calling the work done — the first version of
`card.png` differed from the starter by every byte and still had branches
running off the bottom of the canvas and overlapping the subtitle. Re-render
after any layout change; don't trust the hash alone.

## The dev server lies about status codes

Astro's dev 404 page responds `HTTP 200`, and the site is served under its
GitHub Pages base path (`/comp4020-ass2-ryschneider/`), not `/`. A bare
`curl -o /dev/null -w '%{http_code}'` against an un-prefixed path will report
success on a page that is actually the 404 template. Verify real routes,
under the real base path, and read the rendered content (a screenshot, not
just a status code) before trusting that a page works.

## Commit at the grain of a decision, not a file

Each commit is one content section that stands on its own: the course
record, people, the 12-week arc (sessions + lectures + decks together, since
splitting them let them drift out of sync once already), assessments,
homepage + policies, images, this file. Push after each one passes `pnpm
check` green, so a broken later step never blocks evidence of the working
ones.

## Cite commits as they land, not in advance

Write `PROCESS.md`'s commit links after the commit exists, never as
placeholders to fill in later — a citation that doesn't resolve is worse than
no citation, and `pnpm check:evidence` checks that every one does.
