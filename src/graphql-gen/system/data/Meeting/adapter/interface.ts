import { Connector } from 'oda-api-graphql';
import { PartialMeeting } from '../types/model';

export interface MeetingConnector extends Connector<PartialMeeting> {
  findOneById: (id: string) => Promise<PartialMeeting>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialMeeting,
  ) => Promise<PartialMeeting>;
  findOneByIdAndRemove: (id: string) => Promise<PartialMeeting>;

  addToCurator(args: { meeting?: string; curator?: string }): Promise<void>;
  removeFromCurator(args: {
    meeting?: string;
    curator?: string;
  }): Promise<void>;

  addToGroup(args: { meeting?: string; group?: string }): Promise<void>;
  removeFromGroup(args: { meeting?: string; group?: string }): Promise<void>;

  addToStudents(args: {
    meeting?: string;
    student?: string;
    present?: boolean;
    specialNotes?: string;
    superpuper?: string;
  }): Promise<void>;
  removeFromStudents(args: {
    meeting?: string;
    student?: string;
    present?: boolean;
    specialNotes?: string;
    superpuper?: string;
  }): Promise<void>;
}
