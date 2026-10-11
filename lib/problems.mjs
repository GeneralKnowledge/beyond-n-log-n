import integerMultiplication from '../problems/109.json' with { type: 'json' };
import exactFourier from '../problems/130.json' with { type: 'json' };
import graphSwitches from '../problems/131.json' with { type: 'json' };
import oneTapeSpace from '../problems/137.json' with { type: 'json' };
import subsetSum from '../problems/138.json' with { type: 'json' };

const PARSERS = new Set(['power-saving', 'exponent']);
const COLLECTORS = new Set(['pull-requests', 'result-registry', 'invitation']);
const safeRepo = value => typeof value === 'string' && /^[\w.-]+\/[\w.-]+$/.test(value);
const safePath = value => typeof value === 'string' && /^[\w./-]+$/.test(value) && !value.split('/').includes('..');
const day = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);

export function validateProblem(problem) {
  if (!problem || typeof problem !== 'object') return 'A problem must be an object.';
  if (!/^[0-9]{3}$/.test(problem.id)) return 'A problem id is the three-digit OpenAI family number.';
  if (problem.family !== Number(problem.id)) return 'The family number must match the problem id.';
  if (typeof problem.title !== 'string' || !problem.title.trim()) return 'A problem needs a title.';
  if (typeof problem.formula !== 'string' || !problem.formula.trim()) return 'A problem needs a formula.';
  if (typeof problem.symbol !== 'string' || !problem.symbol.trim()) return 'A problem needs a score symbol.';
  if (!PARSERS.has(problem.parser)) return `Unsupported parser "${problem.parser}". Compatible problems use power-saving.`;
  if (problem.direction !== 'higher' && problem.direction !== 'lower') return 'A problem declares whether higher or lower is better.';
  if (!COLLECTORS.has(problem.collector)) return `Unsupported collector "${problem.collector}".`;
  if (problem.collector === 'invitation') {
    if (problem.parser !== 'exponent') return 'An invitation uses the exponent parser.';
    if (problem.status !== 'invited') return 'An invitation is not a watched result.';
    if (problem.watch) return 'An invitation has no watched repository.';
    if (typeof problem.mark !== 'string' || !problem.mark.trim()) return 'An invitation needs a short mark.';
    if (typeof problem.short !== 'string' || !problem.short.trim()) return 'An invitation needs a short label.';
    if (typeof problem.coordinate !== 'string' || !problem.coordinate.trim()) return 'An invitation says what a later record would improve.';
    if (typeof problem.note !== 'string' || !problem.note.trim()) return 'An invitation says what the published claim includes.';
    if (!problem.try || !/^[\w]+$/.test(problem.try.savingField)) return 'An invitation names the saving field to try.';
    if (typeof problem.try.example !== 'string' || !problem.try.example.trim()) return 'An invitation includes an example saving.';
    if (typeof problem.try.hint !== 'string' || !problem.try.hint.trim()) return 'An invitation says how to try the next record.';
    if (problem.companions !== undefined) {
      if (!Array.isArray(problem.companions)) return 'Companions are a list of separate claims.';
      for (const companion of problem.companions) {
        if (!companion || typeof companion.title !== 'string' || !companion.title.trim()) return 'A companion needs a title.';
        if (!safePath(companion.path)) return 'The companion path must stay inside the source repository.';
        if (!day(companion.date)) return 'A companion needs a manuscript date.';
        if (typeof companion.formula !== 'string' || !companion.formula.trim()) return 'A companion needs a formula.';
        if (typeof companion.saving !== 'string' || !companion.saving.trim()) return 'A companion records its own saving expression.';
        if (typeof companion.savingField !== 'string' || !/^[\w]+$/.test(companion.savingField)) return 'A companion names its saving field.';
        if (companion.savingField === problem.try.savingField) return 'A companion uses a different saving field.';
        if (typeof companion.note !== 'string' || !companion.note.trim()) return 'A companion says how it differs from the headline.';
      }
    }
  } else {
    if (problem.parser !== 'power-saving') return 'A watched problem uses the power-saving parser.';
    const watch = problem.watch;
    if (!watch || !safeRepo(watch.repo)) return 'A watched problem names one public owner/repo.';
    if (!safePath(watch.selection)) return 'The selection path must stay inside the repository.';
    if (problem.collector === 'result-registry' && (typeof watch.savingField !== 'string' || !/^[\w]+$/.test(watch.savingField))) return 'A result registry names the saving field to read.';
  }
  const source = problem.source;
  if (!source || !safeRepo(source.repo)) return 'A problem names its source repository.';
  if (!safePath(source.path)) return 'The source path must stay inside the source repository.';
  if (typeof source.title !== 'string' || !source.title.trim()) return 'A problem names its source manuscript.';
  if (!day(source.date)) return 'A problem records the source manuscript date.';
  if (typeof source.saving !== 'string' || !source.saving.trim()) return 'A problem records the source saving expression.';
  if (problem.lean !== undefined && !safePath(problem.lean)) return 'The Lean note path must stay inside the source repository.';
  return '';
}

export const PROBLEMS = [integerMultiplication, exactFourier, graphSwitches, oneTapeSpace, subsetSum];

for (const problem of PROBLEMS) {
  const error = validateProblem(problem);
  if (error) throw new Error(`Problem ${problem?.id ?? '?'}: ${error}`);
}

export const REGISTRY_PROBLEMS = PROBLEMS.filter(problem => problem.collector === 'result-registry');
export const INVITED_PROBLEMS = PROBLEMS.filter(problem => problem.collector === 'invitation');
