import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import guide from '../docs/how-to-help.md?raw';

export default function HelpGuide(){
 return <div className="markdown-description help-guide"><Markdown remarkPlugins={[remarkMath]} rehypePlugins={[[rehypeKatex,{strict:false,throwOnError:false,trust:false,maxSize:20,maxExpand:1000}]]} skipHtml components={{
  a:({href,children})=>{const safe=href&&/^https:\/\//i.test(href)?href:undefined;return <a href={safe} target="_blank" rel="noreferrer">{children}</a>;},
 }}>{guide}</Markdown></div>;
}
