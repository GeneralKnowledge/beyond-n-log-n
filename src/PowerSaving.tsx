import {ExternalLink,Github} from 'lucide-react';
import type {CatalogEntry} from './types';
import {sci,compact} from './format';
import {catalogEntry} from '../lib/catalog.mjs';
import problem from '../problems/130.json';
import registry from '../problems/130.registry.json';

const sourceSaving = problem.source.saving;
const bundled = catalogEntry(problem, {repo:{html_url:`https://github.com/${problem.watch.repo}`,default_branch:'master'}, registry});

export default function PowerSaving({entry}:{entry?:CatalogEntry}) {
 const shown = entry?.current ? entry : bundled;
 const results = shown.results;
 const current = shown.current;
 const previous = current ? results[results.findIndex(result => result.id === current.id) - 1] : undefined;
 const origin = shown.sourceSaving?.value;
 return <section className="power-saving">
  <div className="metrics" aria-label="Fourier saving">
   <div className="metric primary">
    <span className="metric-label">Selected {problem.symbol}</span>
    <span className="metric-value">{current ? sci(current.value, 6) : '—'}</span>
    <span className="metric-note">{current ? current.name : 'No selection in the registry'}</span>
   </div>
   <div className="metric">
    <span className="metric-label">Previous record</span>
    <span className="metric-value">{current && previous ? compact(current.value / previous.value) : '—'}<span className="metric-unit">×</span></span>
    <span className="metric-note">{previous ? `${previous.expression} on ${previous.date}` : 'No earlier registry row'}</span>
   </div>
   <div className="metric">
    <span className="metric-label">OpenAI manuscript</span>
    <span className="metric-value">{origin ? sci(origin, 0) : sourceSaving}</span>
    <span className="metric-note">{problem.source.date} · published headline</span>
   </div>
   <a className="metric metric-button" href={shown.repoUrl} target="_blank" rel="noreferrer">
    <span className="metric-label">Watched repository <Github size={16}/></span>
    <span className="metric-value">{results.length}</span>
    <span className="metric-note">Registry rows <ExternalLink size={13}/></span>
   </a>
  </div>
  <section className="panel">
   <div className="panel-head">
    <div>
     <h2>Result registry <span className="subtle-pill">{results.length}</span></h2>
     <p>Read from {problem.watch.selection}. Record dates are the dates written in that file. {entry?.current ? 'This table is from the latest collection.' : 'This table is the bundled registry, replaced when the repository is fetched.'}</p>
    </div>
    {shown.selectionUrl && <a className="text-btn" href={shown.selectionUrl} target="_blank" rel="noreferrer">Selection file <ExternalLink size={13}/></a>}
   </div>
   <div className="table-wrap"><table>
    <thead><tr><th>RESULT</th><th>STATUS</th><th className="number-col">CLAIMED {problem.symbol}</th><th>RECORD DATE</th></tr></thead>
    <tbody>{results.map(result => <tr key={result.id}>
     <td><span className="pr-title">{result.name}</span><div className="pr-meta"><span className="pr-number">{result.expression}</span>{result.current && <span className="reviewed-tag">Current selection</span>}</div></td>
     <td>{result.status}</td>
     <td className="kappa-cell">{sci(result.value, 6)}</td>
     <td>{result.date ?? '—'}</td>
    </tr>)}</tbody>
   </table>{!results.length && <div className="empty-state"><p>{entry?.warning || 'This snapshot has not collected the registry yet.'}</p></div>}</div>
  </section>
  <section className="panel power-saving-note">
   <div className="panel-head"><div><h2>What this page reads</h2><p>The repository remains the record. Status words are the ones that file uses.</p></div></div>
   <div className="power-saving-copy">
    <p>A row is a result the repository listed. The current selection is the id named by <code>current</code> in the registry. <code>formalized</code> means that repository recorded a reproduced check. It is not the maintainer ledger used for family 109, and it does not establish the whole Fourier theorem.</p>
    <p>The OpenAI manuscript is the published starting claim, {sourceSaving}. Later rows are later records in the watched repository, not a reconstruction of when each saving was first found.</p>
    <div className="detail-actions">
     <a className="button" href={shown.sourceUrl} target="_blank" rel="noreferrer">OpenAI manuscript <ExternalLink size={13}/></a>
     {current?.recordUrl && <a className="button secondary" href={current.recordUrl} target="_blank" rel="noreferrer">Current record <ExternalLink size={13}/></a>}
     {current?.certificateUrl && <a className="text-btn" href={current.certificateUrl} target="_blank" rel="noreferrer">Certificate <ExternalLink size={13}/></a>}
    </div>
   </div>
  </section>
 </section>;
}
