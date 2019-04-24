export interface ISubject {
  id: string;
  name: string;
  course?: string[];
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Subject implements ISubject {
  public __type: 'Subject' = 'Subject';
  public id: string;
  public name: string;
  public course?: string[];
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialSubject) {
    this.id = init.id;
    this.name = init.name;
    this.course = init.course;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isSubject(obj): obj is ISubject {
  return (
    obj instanceof Subject ||
    obj.__type === 'Subject' ||
    (obj.id ||
      obj.name ||
      obj.course ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
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
