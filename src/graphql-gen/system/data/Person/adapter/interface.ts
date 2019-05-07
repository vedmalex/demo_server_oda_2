import { Connector } from 'oda-api-graphql';
import { PartialPerson } from '../types/model';

import { PartialSocialNetwork } from './../../SocialNetwork/types/model';

import { PartialPhone } from './../../Phone/types/model';

import { PartialEmail } from './../../Email/types/model';

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
