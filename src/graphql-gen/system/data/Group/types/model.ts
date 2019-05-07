import { CourseInput } from './../../Course/types/model';
import { StudentInput } from './../../Student/types/model';
import { CuratorInput } from './../../Curator/types/model';

export interface IGroupInput {
  id: string;
  name: string;
  course?: CourseInput;
  students?: StudentInput[];
  curator?: CuratorInput;
}

export interface IGroup {
  id: string;
  name: string;
  course?: string;
  students?: string[];
  curator?: string;
}

export class GroupInput implements IGroupInput {
  public __type: 'Group' = 'Group';
  public id: string;
  public name: string;
  public course?: CourseInput;
  public students?: StudentInput[];
  public curator?: CuratorInput;
  constructor(init: PartialGroupInput) {
    this.id = init.id;
    this.name = init.name;
    this.course = init.course;
    this.students = init.students;
    this.curator = init.curator;
  }
}

export class Group implements IGroup {
  public __type: 'Group' = 'Group';
  public id: string;
  public name: string;
  public course?: string;
  public students?: string[];
  public curator?: string;
  constructor(init: PartialGroup) {
    this.id = init.id;
    this.name = init.name;
    this.course = init.course;
    this.students = init.students;
    this.curator = init.curator;
  }
}

export function isGroup(obj): obj is IGroup {
  return (
    obj instanceof Group ||
    obj.__type === 'Group' ||
    (obj.id || obj.name || obj.course || obj.students || obj.curator)
  );
}

export type PartialGroup = { [P in keyof IGroup]?: IGroup[P] };

export type PartialGroupInput = { [P in keyof IGroupInput]?: IGroupInput[P] };

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
