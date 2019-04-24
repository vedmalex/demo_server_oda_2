export interface IMeeting {
  id: string;
  date?: Date;
  curator?: string;
  group?: string;
  students?: string[];
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
