export interface IStudent {
  id: string;
  person?: string;
  group?: string;
  meetings?: string[];
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Student implements IStudent {
  public __type: 'Student' = 'Student';
  public id: string;
  public person?: string;
  public group?: string;
  public meetings?: string[];
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialStudent) {
    this.id = init.id;
    this.person = init.person;
    this.group = init.group;
    this.meetings = init.meetings;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isStudent(obj): obj is IStudent {
  return (
    obj instanceof Student ||
    obj.__type === 'Student' ||
    (obj.id ||
      obj.person ||
      obj.group ||
      obj.meetings ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
  );
}

export type PartialStudent = { [P in keyof IStudent]?: IStudent[P] };

export interface IStudentEdge {
  cursor: String;
  node: IStudent;
}

export interface IStudentConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IStudentEdge[];
}
