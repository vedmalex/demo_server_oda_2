import { ISocialNetwork } from './../../SocialNetwork/types/model';
import { IPhone } from './../../Phone/types/model';
import { IEmail } from './../../Email/types/model';

import { UserInput } from './../../User/types/model';
import { StudentInput } from './../../Student/types/model';
import { CuratorInput } from './../../Curator/types/model';

export interface IPersonInput {
  id: string;
  spiritualName: string;
  fullName: string;
  dateOfBirth?: Date;
  user?: UserInput;
  socialNetworks?: ISocialNetwork[];
  phones?: IPhone[];
  emails?: IEmail[];
  asStudents?: StudentInput[];
  asCurator?: CuratorInput;
  specialNotes?: string;
}

export interface IPerson {
  id: string;
  spiritualName: string;
  fullName: string;
  dateOfBirth?: Date;
  user?: string;
  socialNetworks?: ISocialNetwork[];
  phones?: IPhone[];
  emails?: IEmail[];
  asStudents?: string[];
  asCurator?: string;
  specialNotes?: string;
}

export class PersonInput implements IPersonInput {
  public __type: 'Person' = 'Person';
  public id: string;
  public spiritualName: string;
  public fullName: string;
  public dateOfBirth?: Date;
  public user?: UserInput;
  public socialNetworks?: ISocialNetwork[];
  public phones?: IPhone[];
  public emails?: IEmail[];
  public asStudents?: StudentInput[];
  public asCurator?: CuratorInput;
  public specialNotes?: string;
  constructor(init: PartialPersonInput) {
    this.id = init.id;
    this.spiritualName = init.spiritualName;
    this.fullName = init.fullName;
    this.dateOfBirth = init.dateOfBirth;
    this.user = init.user;
    this.socialNetworks = init.socialNetworks;
    this.phones = init.phones;
    this.emails = init.emails;
    this.asStudents = init.asStudents;
    this.asCurator = init.asCurator;
    this.specialNotes = init.specialNotes;
  }
}

export class Person implements IPerson {
  public __type: 'Person' = 'Person';
  public id: string;
  public spiritualName: string;
  public fullName: string;
  public dateOfBirth?: Date;
  public user?: string;
  public socialNetworks?: ISocialNetwork[];
  public phones?: IPhone[];
  public emails?: IEmail[];
  public asStudents?: string[];
  public asCurator?: string;
  public specialNotes?: string;
  constructor(init: PartialPerson) {
    this.id = init.id;
    this.spiritualName = init.spiritualName;
    this.fullName = init.fullName;
    this.dateOfBirth = init.dateOfBirth;
    this.user = init.user;
    this.socialNetworks = init.socialNetworks;
    this.phones = init.phones;
    this.emails = init.emails;
    this.asStudents = init.asStudents;
    this.asCurator = init.asCurator;
    this.specialNotes = init.specialNotes;
  }
}

export function isPerson(obj): obj is IPerson {
  return (
    obj instanceof Person ||
    obj.__type === 'Person' ||
    (obj.id ||
      obj.spiritualName ||
      obj.fullName ||
      obj.dateOfBirth ||
      obj.user ||
      obj.socialNetworks ||
      obj.phones ||
      obj.emails ||
      obj.asStudents ||
      obj.asCurator ||
      obj.specialNotes)
  );
}

export type PartialPerson = { [P in keyof IPerson]?: IPerson[P] };

export type PartialPersonInput = {
  [P in keyof IPersonInput]?: IPersonInput[P]
};

export interface IPersonEdge {
  cursor: String;
  node: IPerson;
}

export interface IPersonConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IPersonEdge[];
}
