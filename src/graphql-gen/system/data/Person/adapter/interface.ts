import { Connector } from 'oda-api-graphql';
import { PartialPerson } from '../types/model';

export interface PersonConnector extends Connector<PartialPerson> {
  findOneById: (id: string) => Promise<PartialPerson>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialPerson,
  ) => Promise<PartialPerson>;
  findOneByIdAndRemove: (id: string) => Promise<PartialPerson>;

  findOneBySpiritualName: (spiritualName: string) => Promise<PartialPerson>;
  findOneBySpiritualNameAndUpdate: (
    spiritualName: string,
    payload: PartialPerson,
  ) => Promise<PartialPerson>;
  findOneBySpiritualNameAndRemove: (
    spiritualName: string,
  ) => Promise<PartialPerson>;

  findOneByFullName: (fullName: string) => Promise<PartialPerson>;
  findOneByFullNameAndUpdate: (
    fullName: string,
    payload: PartialPerson,
  ) => Promise<PartialPerson>;
  findOneByFullNameAndRemove: (fullName: string) => Promise<PartialPerson>;

  addToUser(args: { person?: string; user?: string }): Promise<void>;
  removeFromUser(args: { person?: string; user?: string }): Promise<void>;

  addToSocialNetworks(args: {
    person?: string;
    socialNetwork?: string;
  }): Promise<void>;
  removeFromSocialNetworks(args: {
    person?: string;
    socialNetwork?: string;
  }): Promise<void>;

  addToPhones(args: { person?: string; phone?: string }): Promise<void>;
  removeFromPhones(args: { person?: string; phone?: string }): Promise<void>;

  addToEmails(args: { person?: string; email?: string }): Promise<void>;
  removeFromEmails(args: { person?: string; email?: string }): Promise<void>;

  addToAsStudents(args: { person?: string; student?: string }): Promise<void>;
  removeFromAsStudents(args: {
    person?: string;
    student?: string;
  }): Promise<void>;

  addToAsCurator(args: { person?: string; curator?: string }): Promise<void>;
  removeFromAsCurator(args: {
    person?: string;
    curator?: string;
  }): Promise<void>;
}
