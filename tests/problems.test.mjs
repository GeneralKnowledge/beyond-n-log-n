import test from 'node:test';
import assert from 'node:assert/strict';
import { PROBLEMS, REGISTRY_PROBLEMS, INVITED_PROBLEMS, validateProblem } from '../lib/problems.mjs';
import { catalogEntry, readRegistry } from '../lib/catalog.mjs';
import { collectResearch } from '../lib/github.mjs';
import snapshot from '../problems/130.registry.json' with { type: 'json' };

const fourier = PROBLEMS.find(problem => problem.id === '130');
const registry = {
  schema: 1,
  current: 'five-stage',
  results: [
    { id: 'round11', date: '2026-10-09', name: 'Round eleven', status: 'proposed', fourier_saving: '67/100000', tensor_saving: '1/2', record: 'results/round11.md', certificate: 'verification/certificates/round11_reference.json', verifier: 'verification/verify_round11.py' },
    { id: 'five-stage', date: '2026-10-09', name: 'Five stage', status: 'formalized', fourier_saving: '7547360/10000000000', tensor_saving: '7547361/10000000000', record: 'results/five-stage-pr233.md' },
    { id: 'skipped', name: 'Tensor only', status: 'proposed', tensor_saving: '1/10', record: '../secret' },
  ],
};

test('family 130 is a power-saving registry and family 109 keeps its pull-request collector', () => {
  assert.equal(validateProblem(fourier), '');
  assert.deepEqual(REGISTRY_PROBLEMS.map(problem => problem.id), ['130']);
  assert.equal(PROBLEMS.find(problem => problem.id === '109').collector, 'pull-requests');
  assert.equal(fourier.watch.savingField, 'fourier_saving');
  assert.match(validateProblem({ ...fourier, parser: 'matrix-exponent' }), /power-saving/);
  assert.match(validateProblem({ ...fourier, watch: { ...fourier.watch, selection: '../registry.json' } }), /selection path/);
});

test('the Fourier registry headline is the named saving, not the tensor witness', () => {
  const reading = readRegistry(fourier, registry);
  assert.equal(reading.current.expression, '7547360/10000000000');
  assert.equal(reading.current.value, 7547360 / 10000000000);
  assert.deepEqual(reading.results.map(result => result.id), ['round11', 'five-stage']);
  const entry = catalogEntry(fourier, { repo: { html_url: 'https://github.com/shea256/fourier-transform-below-nlogn', default_branch: 'master' }, registry });
  assert.equal(entry.current.recordUrl, 'https://github.com/shea256/fourier-transform-below-nlogn/blob/master/results/five-stage-pr233.md');
  assert.equal(entry.sourceSaving.value, 1e-13);
  assert.equal(entry.symbol, 'δ');
  assert.equal(catalogEntry(fourier, { registry: { schema: 2 } }).warning, 'Selection file did not match the registry shape.');
  const bundled = readRegistry(fourier, snapshot);
  assert.equal(bundled.current.id, snapshot.current);
  assert.ok(bundled.current.value > 1e-13 && bundled.current.value < 1);
  assert.equal(bundled.results.length, snapshot.results.length);
});

test('families 131, 137 and 138 invite a smaller exponent and stay out of the Fourier collector', () => {
  assert.deepEqual(INVITED_PROBLEMS.map(problem => problem.id), ['131', '137', '138']);
  for (const problem of INVITED_PROBLEMS) {
    assert.equal(validateProblem(problem), '');
    assert.equal(problem.collector, 'invitation');
    assert.equal(problem.direction, 'lower');
    assert.equal(problem.watch, undefined);
  }
  const subset = INVITED_PROBLEMS.find(problem => problem.id === '138');
  assert.equal(subset.try.savingField, 'time_exponent');
  assert.equal(subset.companions[0].savingField, 'space_exponent');
  assert.match(validateProblem({ ...subset, companions: [{ ...subset.companions[0], savingField: 'time_exponent' }] }), /different saving field/);
  assert.match(validateProblem({ ...INVITED_PROBLEMS[0], watch: { repo: 'someone/attempt', selection: 'results/registry.json' } }), /no watched repository/);
  assert.match(validateProblem({ ...fourier, parser: 'exponent' }), /power-saving/);
  assert.deepEqual(REGISTRY_PROBLEMS.map(problem => problem.id), ['130']);
  assert.equal(PROBLEMS.find(problem => problem.id === '137').try.example, '2/5');
});

test('a Fourier registry is collected without disturbing the integer-multiplication record', async () => {
  const encoded = Buffer.from(JSON.stringify(registry)).toString('base64');
  const fetcher = async input => {
    const url = new URL(input);
    let data = [];
    if (url.pathname === '/repos/CrocSwap/integer-mult-bounds') data = { html_url: 'https://github.com/CrocSwap/integer-mult-bounds', default_branch: 'main', forks_count: 0, private: false };
    else if (url.pathname === '/repos/CrocSwap/integer-mult-bounds/readme') data = { content: Buffer.from('no pinned manuscript').toString('base64'), html_url: 'https://github.com/CrocSwap/integer-mult-bounds/blob/main/README.md' };
    else if (url.pathname === '/repos/shea256/fourier-transform-below-nlogn') data = { html_url: 'https://github.com/shea256/fourier-transform-below-nlogn', default_branch: 'master' };
    else if (url.pathname === '/repos/shea256/fourier-transform-below-nlogn/contents/results/registry.json') data = { content: encoded };
    return new Response(JSON.stringify(data), { status: 200 });
  };
  const data = await collectResearch({ fetcher, token: null });
  assert.equal(data.repository.name, 'CrocSwap/integer-mult-bounds');
  assert.equal(data.catalog.length, 1);
  assert.equal(data.catalog[0].id, '130');
  assert.equal(data.catalog[0].current.value, 7547360 / 10000000000);
  assert.equal(data.catalog[0].current.status, 'formalized');
});
