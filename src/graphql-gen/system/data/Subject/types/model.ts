export interface ISubject {
  id: string;
  name: string;
  course?: string[];
}

export class Subject implements ISubject {
  public __type: 'Subject' = 'Subject';
  public id: string;
  public name: string;
  public course?: string[];
  constructor(init: PartialSubject) {
    this.id = init.id;
    this.name = init.name;
    this.course = init.course;
  }
}

export function isSubject(obj): obj is ISubject {
  return (
    obj instanceof Subject ||
    obj.__type === 'Subject' ||
    (obj.id || obj.name || obj.course)
  );
}

export type PartialSubject = { [P in keyof ISubject]?: ISubject[P] };

export interface ISubjectEdge {
  cursor: String;
  node: ISubject;
}

export interface ISubjectConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ISubjectEdge[];
}
