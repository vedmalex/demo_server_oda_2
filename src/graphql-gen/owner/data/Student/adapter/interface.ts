import { Connector } from 'oda-api-graphql';
import { PartialStudent } from '../types/model';

export interface StudentConnector extends Connector<PartialStudent> {
  findOneById: (id: string) => Promise<PartialStudent>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialStudent,
  ) => Promise<PartialStudent>;
  findOneByIdAndRemove: (id: string) => Promise<PartialStudent>;

  addToPerson(args: { student?: string; person?: string }): Promise<void>;
  removeFromPerson(args: { student?: string; person?: string }): Promise<void>;

  addToGroup(args: { student?: string; group?: string }): Promise<void>;
  removeFromGroup(args: { student?: string; group?: string }): Promise<void>;

  addToMeetings(args: { student?: string; meeting?: string }): Promise<void>;
  removeFromMeetings(args: {
    student?: string;
    meeting?: string;
  }): Promise<void>;

  addToCreatedBy(args: { student?: string; user?: string }): Promise<void>;
  removeFromCreatedBy(args: { student?: string; user?: string }): Promise<void>;

  addToUpdateBy(args: { student?: string; user?: string }): Promise<void>;
  removeFromUpdateBy(args: { student?: string; user?: string }): Promise<void>;
}
