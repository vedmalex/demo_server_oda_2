import { PersonInput } from './../../Person/types/model';
import { GroupInput } from './../../Group/types/model';
import { MeetingInput } from './../../Meeting/types/model';

export interface IStudentInput {
  id: string;
  person?: PersonInput;
  group?: GroupInput;
  meetings?: MeetingInput[];
}

export interface IStudent {
  id: string;
  person?: string;
  group?: string;
  meetings?: string[];
}

export class StudentInput implements IStudentInput {
  public __type: 'Student' = 'Student';
  public id: string;
  public person?: PersonInput;
  public group?: GroupInput;
  public meetings?: MeetingInput[];
  constructor(init: PartialStudentInput) {
    this.id = init.id;
    this.person = init.person;
    this.group = init.group;
    this.meetings = init.meetings;
  }
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

export type PartialStudentInput = {
  [P in keyof IStudentInput]?: IStudentInput[P]
};

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
