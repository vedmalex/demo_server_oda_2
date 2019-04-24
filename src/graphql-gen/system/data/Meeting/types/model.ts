export interface IMeeting {
  id: string;
  date?: Date;
  curator?: string;
  group?: string;
  students?: string[];
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Meeting implements IMeeting {
  public __type: 'Meeting' = 'Meeting';
  public id: string;
  public date?: Date;
  public curator?: string;
  public group?: string;
  public students?: string[];
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialMeeting) {
    this.id = init.id;
    this.date = init.date;
    this.curator = init.curator;
    this.group = init.group;
    this.students = init.students;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isMeeting(obj): obj is IMeeting {
  return (
    obj instanceof Meeting ||
    obj.__type === 'Meeting' ||
    (obj.id ||
      obj.date ||
      obj.curator ||
      obj.group ||
      obj.students ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
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
