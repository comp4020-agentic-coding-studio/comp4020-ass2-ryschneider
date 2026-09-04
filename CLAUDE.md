# Your harness

Rules for whichever agent is working in this repo, kept because each one
traces back to something that actually went wrong or would have gone wrong
unnoticed while building `SLOP3972`, "The Fracturing of the Latter Day
Saint Movement."

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

## Content conveys information; it doesn't perform style

Sessions, lectures, decks and bios exist so a student can learn what happened
and why it matters, not to be read for voice. Metaphor, aphorism, and
rhetorical echo cost a sentence without adding a fact — a first content pass
let several through (a "fault lines" metaphor in the week 1 deck, an
"un-revealed by a press release" turn of phrase in week 7, a "splinter,
splintering" echo in week 11). When a sentence is memorable but a plainer
version says the same thing, use the plain version.

## A correction to a pattern is a harness change, not a one-off fix

When feedback targets a pattern across the content ("make it all succinct")
rather than one sentence, fix both the content and this file: add or sharpen
a rule here so the next writing pass doesn't reintroduce the pattern. A
correction that only changes files, and not the harness, gets relearned the
hard way next session.

## One throughline, not new machinery every week

Calling Bullshit, How to Make (Almost) Anything and CS 007 each commit to one
idea and run it the whole way through a semester rather than covering
ground. This course's version of that is the four-part framework (vacuum,
claim, pivot, response): every session applies it to a new splinter group
rather than teaching a new analytical lens for variety. A session draft that
introduces a fifth element, or swaps the lens for "freshness," is schema-valid
but breaks the pattern the other eleven weeks set — check new session content
against the framework already fixed by the earlier weeks, not against what
would make that one week more interesting standing alone.
