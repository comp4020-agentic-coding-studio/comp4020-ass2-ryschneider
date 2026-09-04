# Process overview

Written by you, for a reader: how you got from the brief to the harness and
agentic workflow behind this submission. Markers read this file and follow its
citations; they don't trawl the repo for evidence you didn't point at.

This file is the shape; the course site's
[assessment page](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#what-you-submit)
is the requirement, and its
[word counts](https://comp.anu.edu.au/courses/comp4020-agentic-coding-studio/topics/assessment/#word-counts)
cover every deliverable.

## What I built

**Splinter** (`SLOP3972`) is a fictional third-year history course that takes
the 1844 Latter Day Saint succession crisis — Joseph Smith killed with no
named successor, and the dozen-plus competing churches that argument
produced — as a single semester-long case study in how institutions actually
schism. The brief warns off topics a real university already teaches as a
survey course; rather than "history of the Mormon Church" as a broad topic,
the course commits to one fracture cascade and a repeatable four-part
framework (succession vacuum, charismatic claim, doctrinal pivot,
institutional response) that students apply, week by week, to a different
splinter group, then use to argue their own case in Assignment 1 and map the
whole movement in the final project.

## How I got here

I started from the platform's fixed template (`comp4020-ass2-ryschneider`,
already scaffolded with the harness, spec tests, and crit-week history — see
[`8541ae3`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/8541ae3)
and
[`2f6443f`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/2f6443f)),
which fixes the Astro build, the `astro-theme-university` branding, and the
four content collections' schemas. Everything I touched from there on is
content: `course-config.ts`, `site-config.ts`, and everything under
`src/content/`, `src/decks/`, `src/pages/`, and `src/assets/images/`.

**Course record first.** I set the course code, title, dates, and description
in `course-config.ts` before writing anything else, since every session and
assessment date has to fall inside the course's start/end window:
[`b6dd0c7`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/b6dd0c7).

**People before content that references them.** Sessions and lectures declare
`teachers:` as references into the people collection, so I rewrote both
bios — a convenor whose research is American new-religious-movement schisms,
and a tutor with an archives/genealogy background — before writing any
sessions. I deliberately dropped both starter portrait photos rather than
generate replacements: no AI image tool was available in this environment,
and a stock-photo stand-in would have undercut the course's own
evidence-and-sourcing ethos more than an image-free treatment does:
[`afd27a5`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/afd27a5).

**The 12-week arc.** I planned the semester as a single narrative arc rather
than 12 independent topics — Nauvoo, the succession vacuum, four separate
claimant lines (Twelve, Strang, Reorganization, fundamentalist continuation),
then a pivot to comparative doctrine and legitimacy, then applying the
framework forward to schisms that happened decades later. Writing sessions
and lectures together, week by week, kept each pair consistent (same
teacher, same week's `related:` links) rather than drifting apart as two
separate passes would have:
[`733a24d`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/733a24d).
That commit also rewrote the week 1 deck with real slide content and added a
second deck for week 6, since that session doubles as the Assignment 1
review point.

**Assessments last, against the framework.** Both assessments exist to test
whether a student can use the four-part framework, not just narrate a family
tree: Assignment 1 argues one group's founding through the framework
(weighted marking, evidence specificity against framework use), and the
final project maps at least eight groups and argues three of them through it
in prose (holistic marking, since what makes a map like this work is a
judgement call rather than a checklist):
[`9350f3a`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/9350f3a).

**Homepage, policies, and images.** The homepage's "what you will do" and
"who it is for" sections needed real prose describing the framework and the
no-prior-knowledge-assumed angle, and the policies page needed a genuine
source-citation policy given how much the course leans on being able to
check a claim — appropriate for a course that argues from primary-source-depth
evidence:
[`81c18e9`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/81c18e9).
For the card and hero images I wrote a small Python/Pillow script generating
a branching "fracture tree" — a single line splitting into many, echoing the
succession-vacuum framework visually — rather than reuse or lightly edit the
starter art. The first version's branches ran off the canvas edge and
overlapped the card's title text; I added angle clamping to the branching
function so it fans out inside a bounded wedge, then repositioned the trunk
until it rendered cleanly within frame:
[`a68f4fa`](https://github.com/comp4020-agentic-coding-studio/comp4020-ass2-ryschneider/commit/a68f4fa).

Throughout, I checked correctness with `pnpm check` (typecheck, build, and
the spec tests) after each content section rather than only at the end, and
did a final `git grep -F "STARTER_CONTENT" -- src` sweep to confirm nothing
starter-authored was left in place before this commit.

## Before you ship

`pnpm check:evidence` verifies that this comment is gone, that your citations
resolve to real commits, that a crit week's reflection entry is in
`reflections/`, and that your `CLAUDE.md` is there. It checks that your account
is traceable, not that it is good: that is the marker's call.

Images aren't checked: unlike a citation whose SHA doesn't resolve, a broken
image is visible the moment this file is rendered on GitHub.
