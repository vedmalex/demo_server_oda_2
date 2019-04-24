export interface ICourse {
  id: string;
  name: string;
  subjects?: string[];
  groups?: string[];
}

export class Course implements ICourse {
  public __type: 'Course' = 'Course';
  public id: string;
  public name: string;
  public subjects?: string[];
  public groups?: string[];
  constructor(init: PartialCourse) {
    this.id = init.id;
    this.name = init.name;
    this.subjects = init.subjects;
    this.groups = init.groups;
  }
}

export function isCourse(obj): obj is ICourse {
  return (
    obj instanceof Course ||
    obj.__type === 'Course' ||
    (obj.id || obj.name || obj.subjects || obj.groups)
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
