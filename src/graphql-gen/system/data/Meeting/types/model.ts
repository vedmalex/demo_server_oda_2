import { CuratorInput } from './../../Curator/types/model';
import { GroupInput } from './../../Group/types/model';
import { StudentInput } from './../../Student/types/model';

export interface IMeetingInput {
  id: string;
  date?: Date;
  curator?: CuratorInput;
  group?: GroupInput;
  students?: StudentInput[];
}

export interface IMeeting {
  id: string;
  date?: Date;
  curator?: string;
  group?: string;
  students?: string[];
}

export class MeetingInput implements IMeetingInput {
  public __type: 'Meeting' = 'Meeting';
  public id: string;
  public date?: Date;
  public curator?: CuratorInput;
  public group?: GroupInput;
  public students?: StudentInput[];
  constructor(init: PartialMeetingInput) {
    this.id = init.id;
    this.date = init.date;
    this.curator = init.curator;
    this.group = init.group;
    this.students = init.students;
  }
}

export class Meeting implements IMeeting {
  public __type: 'Meeting' = 'Meeting';
  public id: string;
  public date?: Date;
  public curator?: string;
  public group?: string;
  public students?: string[];
  constructor(init: PartialMeeting) {
    this.id = init.id;
    this.date = init.date;
    this.curator = init.curator;
    this.group = init.group;
    this.students = init.students;
  }
}

export function isMeeting(obj): obj is IMeeting {
  return (
    obj instanceof Meeting ||
    obj.__type === 'Meeting' ||
    (obj.id || obj.date || obj.curator || obj.group || obj.students)
  );
}

export type PartialMeeting = { [P in keyof IMeeting]?: IMeeting[P] };

export type PartialMeetingInput = {
  [P in keyof IMeetingInput]?: IMeetingInput[P]
};

export interface IMeetingEdge {
  cursor: String;
  node: IMeeting;
}

export interface IMeetingConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IMeetingEdge[];
}
