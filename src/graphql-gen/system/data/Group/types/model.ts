export interface IGroup {
  id: string;
  name: string;
  course?: string;
  students?: string[];
  curator?: string;
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Group implements IGroup {
  public __type: 'Group' = 'Group';
  public id: string;
  public name: string;
  public course?: string;
  public students?: string[];
  public curator?: string;
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialGroup) {
    this.id = init.id;
    this.name = init.name;
    this.course = init.course;
    this.students = init.students;
    this.curator = init.curator;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isGroup(obj): obj is IGroup {
  return (
    obj instanceof Group ||
    obj.__type === 'Group' ||
    (obj.id ||
      obj.name ||
      obj.course ||
      obj.students ||
      obj.curator ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
  );
}

export type PartialGroup = { [P in keyof IGroup]?: IGroup[P] };

export interface IGroupEdge {
  cursor: String;
  node: IGroup;
}

export interface IGroupConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: IGroupEdge[];
}
