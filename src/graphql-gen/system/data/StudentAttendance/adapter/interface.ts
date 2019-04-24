import { Connector } from 'oda-api-graphql';
import { PartialStudentAttendance } from '../types/model';

export interface StudentAttendanceConnector
  extends Connector<PartialStudentAttendance> {
  findOneById: (id: string) => Promise<PartialStudentAttendance>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialStudentAttendance,
  ) => Promise<PartialStudentAttendance>;
  findOneByIdAndRemove: (id: string) => Promise<PartialStudentAttendance>;

  addToMeetingLink(args: {
    studentAttendance?: string;
    meeting?: string;
  }): Promise<void>;
  removeFromMeetingLink(args: {
    studentAttendance?: string;
    meeting?: string;
  }): Promise<void>;

  addToStudentLink(args: {
    studentAttendance?: string;
    student?: string;
  }): Promise<void>;
  removeFromStudentLink(args: {
    studentAttendance?: string;
    student?: string;
  }): Promise<void>;
}
