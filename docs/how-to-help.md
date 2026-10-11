# How anyone can help further the maths

Multiplying two n-digit numbers can be proved to take about n log n steps. This project tries to prove a slightly sharper bound,

$$
T(n)=O\!\left(n(\log n)^{1-\kappa}\right),
$$

by making the positive number κ larger. The work is public, in [CrocSwap/integer-mult-bounds](https://github.com/CrocSwap/integer-mult-bounds), maintained by Douglas Colkitt and conditional on OpenAI’s [Integer multiplication below n log n](https://github.com/openai/math/tree/adc7f1241b42e322a6451854ab7e4b4c146bf78a/preprints/Integer-multiplication-below-n-log-n-September-23-2026). This site shows the claims, the maintainer’s current selection, and how ideas cite each other.

You can help by checking, explaining, searching, or improving one piece. A finished small check is a contribution. A larger κ in a pull-request title becomes the selected result only after the maintainer records it.

## Three facts to keep in hand

1. **Larger κ is a stronger proof, measured as an exponent.** It compares asymptotic savings. The practical time of a multiplication program is a separate question.
2. **The results assume a stated framework.** They use a fixed finite alphabet, a fixed number of one-dimensional tapes, and the analytic hypotheses inherited from the OpenAI manuscript and from Harvey–van der Hoeven. A passing replay, a certificate, or a Lean file covers the statement it names. The full multiplication theorem remains an assumption until a proof of that theorem exists.
3. **The headline on this site is the maintainer’s selection.** It is read from [`certificates/selected-result.json`](https://github.com/CrocSwap/integer-mult-bounds/blob/main/certificates/selected-result.json) on the upstream default branch. Quote the exact fraction from that record, or from the pull request you are discussing. The number moves.

## If you have an hour

1. Select the maintainer-reviewed κ on this site. Read its review scope, source pull requests, and reproduce line.
2. Open the proof linked there. Write one sentence that says what is new and which pull request it extends.
3. With Python 3.11 or newer, run the reproduce command printed in the upstream README for the current reviewed result. Save the command and the commit you used.
4. Open one newer pull request that states a κ. Check three things: the exact fraction, the earlier fraction it is compared with, and the dependency commit it names.
5. Comment on that pull request with those three checks. A match is worth reporting. A mismatch is worth reporting beside the command and the commit.

That is a complete contribution.

## Choose one kind of help

### Check a claim

Compare the title, the fraction in the description, and the certificate or checker in the branch. Follow costs the proof says are included: copied centers, endpoint copies, rare cases, routers, and workspace restoration. A saving that drops one of those costs still needs that cost put back before it is an improvement.

On this site, a **Reviewed** tag appears when the repository, pull-request number, current head commit, and exact claimed κ match the maintainer record. A later push to that pull request needs a new match.

### Explain one piece

Write a short note a newcomer can follow: what the construction reuses, what it changes, and which hypotheses it keeps. Link the pull request and the commit. Later improvements get composed when this note exists.

### Improve one mechanism

Fork the research repository and branch from the pinned commit you are extending. Change one thing. Improvements so far have come from reusing a register that was already free, moving gates onto a delivery frame that already existed, tightening one parameter, finishing a shared bank, and searching a frozen family of modules.

### Record a search, including one that finds no improvement

Publish the family you searched, the best value inside it, and the check that excludes the other members. Say that this optimum is for that family. A closed door tells the next person where to look instead.

### Formalise a finite piece

A Lean check is a contribution when it names its Lean and Mathlib versions and proves a stated identity, a finite count, or a scoped inequality. Phrase the pull request as a proof of that statement.

## Submit an improvement

1. Use a [GitHub](https://github.com) account and fork [CrocSwap/integer-mult-bounds](https://github.com/CrocSwap/integer-mult-bounds).
2. Put the prerequisite commit in the pull request. Build on that commit.
3. State κ as an exact fraction, and state the exact fraction you compare it with.
4. Say what is new, and name the earlier pull requests that are dependencies.
5. Add a check another person can run. Put the command in the pull request. The upstream README’s `make` targets are the pattern.
6. Keep the OpenAI framework, and any analytic, uniform-recursion, or fixed-tape hypotheses the construction still uses, visible in the write-up.
7. Credit the authors you built on. If a model assisted the text, the search, or the code, say so, in the same way the repository’s notices do.
8. Open the pull request against `CrocSwap/integer-mult-bounds`. A draft fits while the check is still failing.

A composition of two improvements needs both commits named, and every cost from both sides still paid. Parallel reviewed work keeps its credit in [CONTRIBUTORS.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/CONTRIBUTORS.md) when its gain stays out of the selected κ.

Patches under `patches/` apply one at a time to the unmodified pinned manuscript. Each patch is an alternative starting point.

## A pull request that is easy to review

Use a title that names the change, the exact κ, and the pull request you extend.

> Conditional on the OpenAI #109 framework and on pull request NUMBER at COMMIT. This changes ONE MECHANISM and gives κ = a/b. The comparison is against pull request EARLIER at COMMIT, whose published κ is c/d. The analytic and fixed-tape hypotheses are unchanged. Reproduce with the `make` target named here.

Then link the certificate and summarise the check you ran. The [contributor record](https://github.com/CrocSwap/integer-mult-bounds/blob/main/CONTRIBUTORS.md) shows the level of attribution reviewers already keep.

## Where this site helps

- **Overview** lists every claim. Sort by claimed κ to see who is ahead of the selection, and open a row for the source text.
- **Timeline** separates the maintainer’s selection from submitted claims. A point on the claim layer leaves the selection line where it is.
- **Lineage** draws an arrow when a description explicitly reuses, composes, inherits, or depends on another pull request. Similar methods and credit lists stay unlinked. The order is pull-request opening order.
- **Field map** groups write-ups by phrases such as circuits, linear algebra, and formal verification. Selecting a field filters the contribution table to those phrases.

## Claims that need extra words

Add one sentence when any of these is true, so a reader can see the scope:

- The write-up is about the cost of a program on a computer, a benchmark, or a linear-time algorithm. Say which, and keep it separate from κ.
- The evidence is a test, a certificate, or a manuscript build. Name the statement that evidence covers.
- The fraction beats a named earlier fraction. Show both exact values and the commits.
- The idea-lineage view shows a path through your pull request. That view records reuse language in the current description.

## Correct this guide

Corrections to these instructions, and to the dashboard that displays them, belong in the repository that contains this file.
