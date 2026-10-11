import integerMultiplication from '../problems/109.json' with { type: 'json' };
import exactFourier from '../problems/130.json' with { type: 'json' };

const PARSERS = new Set(['power-saving']);
const COLLECTORS = new Set(['pull-requests', 'result-registry']);

export function validateProblem(problem) {
  if (!problem || typeof problem !== 'object') return 'A problem must be an object.';
  if (!/^[0-9]{3}$/.test(problem.id)) return 'A problem id is the three-digit OpenAI family number.';
  if (problem.family !== Number(problem.id)) return 'The family number must match the problem id.';
  if (typeof problem.title !== 'string' || !problem.title.trim()) return 'A problem needs a title.';
  if (typeof problem.formula !== 'string' || !problem.formula.trim()) return 'A problem needs a formula.';
  if (typeof problem.symbol !== 'string' || !problem.symbol.trim()) return 'A problem needs a score symbol.';
  if (!PARSERS.has(problem.parser)) return `Unsupported parser "${problem.parser}". Compatible problems use power-saving.`;
  if (problem.direction !== 'higher' && problem.direction !== 'lower') return 'A power-saving declares whether higher or lower is better.';
  if (!COLLECTORS.has(problem.collector)) return `Unsupported collector "${problem.collector}".`;
  const watch = problem.watch;
  if (!watch || !/^[\w.-]+\/[\w.-]+$/.test(watch.repo)) return 'A watched problem names one public owner/repo.';
  if (typeof watch.selection !== 'string' || !/^[\w./-]+$/.test(watch.selection) || watch.selection.split('/').includes('..')) return 'The selection path must stay inside the repository.';
  if (problem.collector === 'result-registry' && (typeof watch.savingField !== 'string' || !/^[\w]+$/.test(watch.savingField))) return 'A result registry names the saving field to read.';
  const source = problem.source;
  if (!source || !/^[\w.-]+\/[\w.-]+$/.test(source.repo)) return 'A problem names its source repository.';
  if (typeof source.path !== 'string' || !/^[\w./-]+$/.test(source.path) || source.path.split('/').includes('..')) return 'The source path must stay inside the source repository.';
  if (typeof source.saving !== 'string' || !source.saving.trim()) return 'A problem records the source saving expression.';
  return '';
}

export const PROBLEMS = [integerMultiplication, exactFourier];

for (const problem of PROBLEMS) {
  const error = validateProblem(problem);
  if (error) throw new Error(`Problem ${problem?.id ?? '?'}: ${error}`);
}

export const REGISTRY_PROBLEMS = PROBLEMS.filter(problem => problem.collector === 'result-registry');
