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
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
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
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
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
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
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
      obj.specialNotes ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
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
