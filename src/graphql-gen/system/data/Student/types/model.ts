export interface IStudent {
  id: string;
  person?: string;
  group?: string;
  meetings?: string[];
}

export class Student implements IStudent {
  public __type: 'Student' = 'Student';
  public id: string;
  public person?: string;
  public group?: string;
  public meetings?: string[];
  constructor(init: PartialStudent) {
    this.id = init.id;
    this.person = init.person;
    this.group = init.group;
    this.meetings = init.meetings;
  }
}

export function isStudent(obj): obj is IStudent {
  return (
    obj instanceof Student ||
    obj.__type === 'Student' ||
    (obj.id || obj.person || obj.group || obj.meetings)
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
