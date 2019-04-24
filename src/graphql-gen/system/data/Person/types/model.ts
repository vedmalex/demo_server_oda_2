export interface IPerson {
  id: string;
  spiritualName: string;
  fullName: string;
  dateOfBirth?: Date;
  user?: string;
  socialNetworks?: string[];
  phones?: string[];
  emails?: string[];
  asStudents?: string[];
  asCurator?: string;
  specialNotes?: string;
}

export class Person implements IPerson {
  public __type: 'Person' = 'Person';
  public id: string;
  public spiritualName: string;
  public fullName: string;
  public dateOfBirth?: Date;
  public user?: string;
  public socialNetworks?: string[];
  public phones?: string[];
  public emails?: string[];
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
