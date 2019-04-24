export interface ICourse {
  id: string;
  name: string;
  subjects?: string[];
  groups?: string[];
  createdBy?: string;
  updateBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  removed?: boolean;
  owner?: string;
}

export class Course implements ICourse {
  public __type: 'Course' = 'Course';
  public id: string;
  public name: string;
  public subjects?: string[];
  public groups?: string[];
  public createdBy?: string;
  public updateBy?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public removed?: boolean;
  public owner?: string;
  constructor(init: PartialCourse) {
    this.id = init.id;
    this.name = init.name;
    this.subjects = init.subjects;
    this.groups = init.groups;
    this.createdBy = init.createdBy;
    this.updateBy = init.updateBy;
    this.createdAt = init.createdAt;
    this.updatedAt = init.updatedAt;
    this.removed = init.removed;
    this.owner = init.owner;
  }
}

export function isCourse(obj): obj is ICourse {
  return (
    obj instanceof Course ||
    obj.__type === 'Course' ||
    (obj.id ||
      obj.name ||
      obj.subjects ||
      obj.groups ||
      obj.createdBy ||
      obj.updateBy ||
      obj.createdAt ||
      obj.updatedAt ||
      obj.removed ||
      obj.owner)
  );
}

export type PartialCourse = { [P in keyof ICourse]?: ICourse[P] };

export interface ICourseEdge {
  cursor: String;
  node: ICourse;
}

export interface ICourseConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ICourseEdge[];
}
