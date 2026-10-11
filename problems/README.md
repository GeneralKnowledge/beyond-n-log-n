# Watched problems

This site monitors public repositories. It does not host the research. A problem file says which repository to read, which file that repository uses as its current selection, and how to read the saving.

Family 109 is the integer-multiplication dashboard already collected from pull requests and `certificates/selected-result.json`. Family 130 is the first problem collected from a result registry.

## A compatible problem

A problem fits this collector when all of these hold:

- The progress coordinate is one power saving in `O(n (log n)^{1−s})`, with `s` strictly between 0 and 1.
- Higher, or lower, is declared, and the claims are not folded into a second number.
- The work lives in one public git repository.
- That repository keeps a JSON selection file with `schema: 1`, a `current` id, and a `results` array.
- Each result stores its saving under one named field, as an exact expression such as `7547360/10000000000`. The parser does not evaluate arbitrary code.
- Each result has a record path inside the repository. Dates on those rows are record dates, not discovery times.

Family 130 uses the field `fourier_saving`. The next repository with that same shape can name its own field. Copy `problems/130.json`, change the id, repository, selection path, and saving field, then add the import in `lib/problems.mjs`.

The registry statuses are shown as that repository wrote them. `formalized` there means the repository recorded a check. It does not become the maintainer ledger used for family 109, and it does not by itself prove the whole theorem.

## Invited attempts

Families 131, 137, and 138 are on the page so someone can try a smaller exponent. Each one has a published bound and no watched repository. Lower is better. The page shows a `results/registry.json` shape and the field name to use.

- **131, graph switches.** Mixing time at most `2n^8`. The field is `mixing_exponent`. The degree 8 is outside the Fourier reader, which only accepts a saving strictly between 0 and 1.
- **137, one-tape space.** Space `O(T^{2/5} polylog(T))`. The field is `space_exponent`.
- **138, subset sum.** Time `O(2^{0.49n})`. The field is `time_exponent`. The companion low-space bound uses `space_exponent` and stays a separate claim.

An invitation has no `watch` repository. When a public registry exists, change that problem to `result-registry` only if the reader can take its saving without treating it as δ. Until then the page has nothing to select.

## Not this parser

These families name a number, and they are a different kind of claim.

- **107, matrix multiplication.** Several exponents, and lower is better. `ω ≤ 9/4`, `ω < 2.258`, and `ω < 2.371…` are separate claims.
- **003, quasi-Riemann hypothesis.** A zero-free half-plane, `Re(s) > 7/8`.
