import type {CatalogEntry} from '../src/types';

export interface ProblemFile {
 id:string;
 family:number;
 title:string;
 formula:string;
 symbol:string;
 watch:{repo:string;selection:string;savingField:string};
 source:{repo:string;path:string;title:string;date:string;saving:string};
}

export interface RegistryResultInput {
 id:string;
 name:string;
 status?:string;
 date?:string;
 record?:string;
 certificate?:string;
 verifier?:string;
}

export interface RegistryFile {
 schema:number;
 current:string;
 results:RegistryResultInput[];
}

export interface RegistryRow {
 id:string;
 name:string;
 status:string;
 date:string|null;
 value:number;
 expression:string;
 current:boolean;
 record:string|null;
 certificate:string|null;
 verifier:string|null;
}

export function readRegistry(problem:Pick<ProblemFile,'watch'>,registry:RegistryFile|null):{current:RegistryRow|null;results:RegistryRow[]}|null;
export function catalogEntry(problem:ProblemFile,input?:{repo?:{html_url?:string;default_branch?:string}|null;registry?:RegistryFile|null;warning?:string}):CatalogEntry;
