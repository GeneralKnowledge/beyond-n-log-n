import { parseExpression } from './research.mjs';

const safePath = path => typeof path === 'string' && /^[\w./-]+$/.test(path) && !path.split('/').includes('..');
const day = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : null;

export function readRegistry(problem, registry) {
  if (!registry || registry.schema !== 1 || typeof registry.current !== 'string' || !Array.isArray(registry.results)) return null;
  const field = problem.watch.savingField;
  const results = [];
  for (const row of registry.results) {
    if (!row || typeof row.id !== 'string' || typeof row.name !== 'string') continue;
    const parsed = parseExpression(String(row[field] ?? ''));
    if (!parsed) continue;
    results.push({
      id: row.id,
      name: row.name,
      status: typeof row.status === 'string' ? row.status : 'recorded',
      date: day(row.date),
      value: parsed.value,
      expression: parsed.expression,
      current: row.id === registry.current,
      record: safePath(row.record) ? row.record : null,
      certificate: safePath(row.certificate) ? row.certificate : null,
      verifier: safePath(row.verifier) ? row.verifier : null,
    });
  }
  return { current: results.find(result => result.current) ?? null, results };
}

export function catalogEntry(problem, { repo = null, registry = null, warning = '' } = {}) {
  const reading = registry ? readRegistry(problem, registry) : null;
  if (registry && !reading) warning = warning ? `${warning} Selection file did not match the registry shape.` : 'Selection file did not match the registry shape.';
  const branch = typeof repo?.default_branch === 'string' && /^[\w./-]+$/.test(repo.default_branch) && !repo.default_branch.split('/').includes('..') ? repo.default_branch : null;
  const repoUrl = typeof repo?.html_url === 'string' ? repo.html_url : `https://github.com/${problem.watch.repo}`;
  const blob = path => branch && path ? `${repoUrl}/blob/${branch}/${path}` : null;
  const present = result => result && {
    id: result.id,
    name: result.name,
    status: result.status,
    date: result.date,
    value: result.value,
    expression: result.expression,
    current: result.current,
    recordUrl: blob(result.record),
    certificateUrl: blob(result.certificate),
    verifierUrl: blob(result.verifier),
  };
  const sourceSaving = parseExpression(problem.source.saving);
  return {
    id: problem.id,
    family: problem.family,
    title: problem.title,
    formula: problem.formula,
    symbol: problem.symbol,
    repo: problem.watch.repo,
    repoUrl,
    branch,
    selectionPath: problem.watch.selection,
    selectionUrl: blob(problem.watch.selection),
    sourceUrl: `https://github.com/${problem.source.repo}/tree/main/${problem.source.path}`,
    sourceTitle: problem.source.title,
    sourceDate: problem.source.date,
    sourceSaving: sourceSaving ? { value: sourceSaving.value, expression: sourceSaving.expression } : null,
    warning,
    current: present(reading?.current) || null,
    results: (reading?.results ?? []).map(present).filter(Boolean),
  };
}
