# How anyone can help further the maths

Multiplying two n-digit numbers can be proved to take about n log n steps. This project tries to prove a slightly sharper bound,

$$
T(n)=O\!\left(n(\log n)^{1-\kappa}\right),
$$

by making the positive number κ larger. The work is public, in [CrocSwap/integer-mult-bounds](https://github.com/CrocSwap/integer-mult-bounds), maintained by Douglas Colkitt and conditional on OpenAI’s [Integer multiplication below n log n](https://github.com/openai/math/tree/adc7f1241b42e322a6451854ab7e4b4c146bf78a/preprints/Integer-multiplication-below-n-log-n-September-23-2026).

A model can help you find the next local improvement. It proposes one change to a published construction and writes a program that recomputes κ with integers. You run that program. The fraction counts only after the program agrees and every cost from the old proof is still paid.

## Three facts to keep in hand

1. **Larger κ is a stronger proof, measured as an exponent.** It compares asymptotic savings. The practical time of a multiplication program is a separate question.
2. **The results assume a stated framework.** They use a fixed finite alphabet, a fixed number of one-dimensional tapes, and the analytic hypotheses inherited from the OpenAI manuscript and from Harvey–van der Hoeven. A passing replay, a certificate, or a Lean file covers the statement it names. The full multiplication theorem remains an assumption until a proof of that theorem exists.
3. **The headline on this site is the maintainer’s selection.** It is read from [`certificates/selected-result.json`](https://github.com/CrocSwap/integer-mult-bounds/blob/main/certificates/selected-result.json) on the upstream default branch. Quote the exact fraction from that record, or from the construction you are editing. The number moves.

## One session with a model

1. On this site, open the maintainer-reviewed κ. Copy its proof, its exact fraction, and the reproduce command.
2. Paste those into the model with the prompt below. Ask for one change.
3. Run the Python program it returns. Save the command, the commit you started from, and the fraction the program printed.
4. Paste that output back and ask the second prompt, the one that looks for a dropped cost.
5. Keep the change when the new fraction is an exact rational greater than the old one, and the program still charges copied centers, endpoint copies, rare cases, routers, and workspace restoration.

A session that ends with a smaller fraction, or with a cost put back, is still a result. Record the family you tried and the fraction the checker printed.

### The prompt

```
You are improving a conditional integer-multiplication exponent.

Start from the construction below and from κ = OLD_FRACTION.
Keep the OpenAI fixed finite-alphabet, fixed-tape framework and the analytic hypotheses.
Keep these costs charged: copied centers, endpoint copies, rare cases, routers, workspace restoration.

Propose ONE change: reuse a register that is already free, move gates onto a frame that already exists, tighten one parameter inside the published inequalities, or search the finite family I name.

Return:
1. The change in words, and the identity that still holds.
2. The new κ as a reduced exact fraction, written beside the old fraction.
3. A Python 3 program that recomputes that fraction with integers only. The certificate uses no floats.
4. The costs you kept, and any cost you are unsure about.

Construction:
PASTE THE PROOF OR CERTIFICATE HERE
```

### The follow-up

```
Here is the program's output. Which kept cost is the weakest, and what is the exact fraction if that cost is charged in full? Change the program and print both fractions.
```

Replace `OLD_FRACTION` with the fraction from the construction, such as `90446448750933/125000000000000000`. Name the family when you want a search: row and column words, gauges, module shapes, or a range of the dimension `h`.

## Changes a model can actually hunt

These are the moves that have raised κ in this project. Ask for one of them.

- **An idle register or an unused ancestor.** Role counts fall when a wire is already determined by a sum that is being computed. The scalar map and the scratch restoration stay as they were.
- **A gate moved onto a frame that already exists.** The operation’s feasible interval is the join of incoming frames and the meet of outgoing frames. Landing on an endpoint of that interval is the usual gain.
- **One tighter parameter.** Keep the published inequalities, replace one rational, and show every margin still positive. Return the margin as an exact rational.
- **A search of a frozen family.** Fix the split, the anchors, and the compiler. Vary one small choice, such as which of eight words is used at the first three levels. Return the best member and a lower bound that excludes each other member at that saving.
- **A compatibility check before a composition.** Two improvements combine when every boundary the first one preserved is a boundary the second one needs. Ask the model to list those boundaries and to refuse the sum when one of them moved.

Ask a coding agent for the same thing in the repository: point it at the pinned commit, the proof file, and the existing `make` target. Tell it to edit the checker, leave the old tests passing, and print the old fraction beside the new one. Read the diff. The new κ is the number the checker prints.

## Require an exact check

Accept a candidate when all of these are in your hands:

- κ is a reduced fraction, and the program prints that fraction.
- The comparison is against the fraction you started from, at a named commit.
- The program charges the costs listed above.
- You can run the program yourself.

Send the answer back when the model offers a new proof of the whole multiplication algorithm, a decimal with no fraction, two savings added together, or a write-up with no program. Ask it to replace that answer with the one change and the integer program.

A Lean file is a useful check when it names its Lean and Mathlib versions and proves one identity, one finite count, or one scoped inequality. Ask the model for that statement, then compile it.

## Where this site helps you choose the text

- **Overview** lists every claim. Sort by claimed κ and open a row to copy the source text into the prompt.
- **Timeline** separates the maintainer’s selection from submitted claims. Start from the selection when you want the current construction. Start from a claim when you want a different mechanism.
- **Lineage** draws an arrow when a description explicitly reuses, composes, inherits, or depends on another pull request. Those arrows are a reading list for the boundaries a composition has to preserve. Similar methods and credit lists stay unlinked.
- **Field map** groups write-ups by phrases such as circuits, linear algebra, and formal verification. Selecting a field filters the table to those phrases.

## Submit an improvement

When the checker agrees, other people can use the result.

1. Use a [GitHub](https://github.com) account and fork [CrocSwap/integer-mult-bounds](https://github.com/CrocSwap/integer-mult-bounds).
2. Put the prerequisite commit in the pull request. Build on that commit.
3. State κ as an exact fraction, and state the exact fraction you compare it with.
4. Say what is new, and name the earlier pull requests that are dependencies.
5. Add the checker. Put the command in the pull request. The upstream README’s `make` targets are the pattern.
6. Keep the OpenAI framework, and any analytic, uniform-recursion, or fixed-tape hypotheses the construction still uses, visible in the write-up.
7. Credit the authors you built on. Say which model assisted the search, the text, or the code, in the same way the repository’s notices do.
8. Open the pull request against `CrocSwap/integer-mult-bounds`. A draft fits while the check is still failing.

A composition of two improvements needs both commits named, and every cost from both sides still paid. Parallel reviewed work keeps its credit in [CONTRIBUTORS.md](https://github.com/CrocSwap/integer-mult-bounds/blob/main/CONTRIBUTORS.md) when its gain stays out of the selected κ.

Patches under `patches/` apply one at a time to the unmodified pinned manuscript. Each patch is an alternative starting point.

On this site, a **Reviewed** tag appears when the repository, pull-request number, current head commit, and exact claimed κ match the maintainer record. A later push needs a new match. Commenting on an existing pull request with the three checks from a session, the fraction, the comparison, and the commit, is a contribution of its own.

### A pull request that is easy to review

Use a title that names the change, the exact κ, and the pull request you extend.

> Conditional on the OpenAI #109 framework and on pull request NUMBER at COMMIT. This changes ONE MECHANISM and gives κ = a/b. The comparison is against pull request EARLIER at COMMIT, whose published κ is c/d. The analytic and fixed-tape hypotheses are unchanged. Reproduce with the `make` target named here. Model assistance: NAME, for the search and the checker.

Then link the certificate and summarise the check you ran.

## Claims that need extra words

Add one sentence when any of these is true, so a reader can see the scope:

- The write-up is about the cost of a program on a computer, a benchmark, or a linear-time algorithm. Say which, and keep it separate from κ.
- The evidence is a test, a certificate, or a manuscript build. Name the statement that evidence covers.
- The fraction beats a named earlier fraction. Show both exact values and the commits.
- The idea-lineage view shows a path through your pull request. That view records reuse language in the current description.

## Correct this guide

Corrections to these instructions, and to the dashboard that displays them, belong in the repository that contains this file.
