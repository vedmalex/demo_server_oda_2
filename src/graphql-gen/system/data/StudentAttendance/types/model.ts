export interface IStudentAttendance {
  id: string;
  meeting?: string;
  student?: string;
  meetingLink?: string;
  studentLink?: string;
  present: boolean;
  specialNotes?: string;
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
  superpuper?: string;
}

export class StudentAttendance implements IStudentAttendance {
  public __type: 'StudentAttendance' = 'StudentAttendance';
  public id: string;
  public meeting?: string;
  public student?: string;
  public meetingLink?: string;
  public studentLink?: string;
  public present: boolean;
  public specialNotes?: string;
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  public superpuper?: string;
  constructor(init: PartialStudentAttendance) {
    this.id = init.id;
    this.meeting = init.meeting;
    this.student = init.student;
    this.meetingLink = init.meetingLink;
    this.studentLink = init.studentLink;
    this.present = init.present;
    this.specialNotes = init.specialNotes;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
    this.superpuper = init.superpuper;
  }
}

export function isStudentAttendance(obj): obj is IStudentAttendance {
  return (
    obj instanceof StudentAttendance ||
    obj.__type === 'StudentAttendance' ||
    (obj.id ||
      obj.meeting ||
      obj.student ||
      obj.meetingLink ||
      obj.studentLink ||
      obj.present ||
      obj.specialNotes ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner ||
      obj.superpuper)
  );
}

export type PartialStudentAttendance = {
  [P in keyof IStudentAttendance]?: IStudentAttendance[P]
};

export interface IStudentAttendanceEdge {
  cursor: String;
  node: IStudentAttendance;
}

export interface IStudentAttendanceConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IStudentAttendanceEdge[];
}
