import {ExternalLink} from 'lucide-react';

export interface InvitedCompanion {
 title:string;
 path:string;
 date:string;
 formula:string;
 saving:string;
 savingField:string;
 note:string;
}

const INVITED_IDS=['131','137','138'] as const;
export type InvitedId=typeof INVITED_IDS[number];

export interface InvitationFile {
 id:string;
 family:number;
 title:string;
 short:string;
 formula:string;
 symbol:string;
 mark:string;
 parser:string;
 direction:string;
 status:string;
 collector:string;
 coordinate:string;
 note:string;
 try:{savingField:string;example:string;hint:string};
 companions?:InvitedCompanion[];
 source:{repo:string;path:string;title:string;date:string;saving:string};
 lean?:string;
}

export interface InvitedProblem extends InvitationFile {
 id:InvitedId;
 parser:'exponent';
 direction:'lower'|'higher';
 status:'invited';
 collector:'invitation';
}

export function toInvited(problem:InvitationFile):InvitedProblem {
 if(problem.id!=='131'&&problem.id!=='137'&&problem.id!=='138') throw new Error(`Unexpected invitation ${problem.id}`);
 if(problem.parser!=='exponent'||problem.collector!=='invitation'||problem.status!=='invited') throw new Error(`Problem ${problem.id} is not an invitation`);
 if(problem.direction!=='lower'&&problem.direction!=='higher') throw new Error(`Problem ${problem.id} needs a direction`);
 return {...problem,id:problem.id,parser:'exponent',collector:'invitation',status:'invited',direction:problem.direction};
}

const tree=(repo:string,path:string)=>`https://github.com/${repo}/tree/main/${path}`;
const blob=(repo:string,path:string)=>`https://github.com/${repo}/blob/main/${path}`;

function template(problem:InvitedProblem){
 const result:Record<string,string>={
  id:'published-bound',
  date:problem.source.date,
  name:'Published manuscript',
  status:'published',
  record:'results/published-bound.md',
 };
 result[problem.try.savingField]=problem.try.example;
 return JSON.stringify({schema:1,current:'published-bound',results:[result]},null,2);
}

export default function Invitation({problem}:{problem:InvitedProblem}){
 const manuscript=tree(problem.source.repo,problem.source.path);
 return <section className="power-saving invitation">
  <h2 className="invitation-title">{problem.title}</h2>
  <div className="metrics" aria-label={`${problem.title} invitation`}>
   <div className="metric primary">
    <span className="metric-label">Published bound</span>
    <span className="metric-value">{problem.source.saving}</span>
    <span className="metric-note">{problem.source.date} · OpenAI manuscript</span>
   </div>
   <div className="metric">
    <span className="metric-label">Direction</span>
    <span className="metric-value">{problem.direction==='lower'?'Lower':'Higher'}</span>
    <span className="metric-note">{problem.direction==='lower'?'A smaller exponent is the later record':'A larger exponent is the later record'}</span>
   </div>
   <div className="metric">
    <span className="metric-label">Watched repository</span>
    <span className="metric-value">None</span>
    <span className="metric-note">No public selection is being read</span>
   </div>
   <a className="metric metric-button" href={manuscript} target="_blank" rel="noreferrer">
    <span className="metric-label">Manuscript</span>
    <span className="metric-value">{problem.family}</span>
    <span className="metric-note">OpenAI family <ExternalLink size={13}/></span>
   </a>
  </div>
  <section className="panel">
   <div className="panel-head">
    <div>
     <h2>Try a smaller exponent</h2>
     <p>{problem.coordinate}</p>
    </div>
   </div>
   <div className="power-saving-copy">
    <p>{problem.note}</p>
    <p>{problem.try.hint}</p>
    <p>Keep <code>results/registry.json</code> in a public repository. Name that repository in the problem file when you want this page to read it. The site monitors the file. It does not host the attempt or decide that a row is accepted.</p>
    <pre className="invitation-template"><code>{template(problem)}</code></pre>
    <p>The field for this attempt is <code>{problem.try.savingField}</code>. <code>current</code> names the selected row. A record path stays inside the repository, and the date is the date written in the file.</p>
   </div>
  </section>
  {problem.companions?.map(companion=><section className="panel" key={companion.savingField}>
   <div className="panel-head">
    <div>
     <h2>{companion.title}</h2>
     <p>{companion.date} · {companion.formula}</p>
    </div>
    <a className="text-btn" href={tree(problem.source.repo,companion.path)} target="_blank" rel="noreferrer">Manuscript <ExternalLink size={13}/></a>
   </div>
   <div className="power-saving-copy">
    <p>{companion.note} Its field is <code>{companion.savingField}</code>, and the published expression is <code>{companion.saving}</code>.</p>
   </div>
  </section>)}
  <section className="panel power-saving-note">
   <div className="panel-head"><div><h2>What trying means here</h2><p>A public repository can carry the next record. This page has no selection until that file exists.</p></div></div>
   <div className="power-saving-copy">
    <p>The number above is the published starting claim, {problem.source.saving}. A later row is a later record in the watched repository. Popularity, a passing check, and a smaller number are three separate facts.</p>
    <div className="detail-actions">
     <a className="button" href={manuscript} target="_blank" rel="noreferrer">OpenAI manuscript <ExternalLink size={13}/></a>
     {problem.lean&&<a className="button secondary" href={blob(problem.source.repo,problem.lean)} target="_blank" rel="noreferrer">Lean scope note <ExternalLink size={13}/></a>}
    </div>
   </div>
  </section>
 </section>;
}
