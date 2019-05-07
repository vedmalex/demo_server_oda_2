import { SubjectInput } from './../../Subject/types/model';
import { CourseInput } from './../../Course/types/model';

export interface ISubjectCourseInput {
  id: string;
  description?: string;
  subject?: string;
  course?: string;
  subjectLink?: SubjectInput;
  courseLink?: CourseInput;
  hours?: number;
  level?: string;
}

export interface ISubjectCourse {
  id: string;
  description?: string;
  subject?: string;
  course?: string;
  subjectLink?: string;
  courseLink?: string;
  hours?: number;
  level?: string;
}

export class SubjectCourseInput implements ISubjectCourseInput {
  public __type: 'SubjectCourse' = 'SubjectCourse';
  public id: string;
  public description?: string;
  public subject?: string;
  public course?: string;
  public subjectLink?: SubjectInput;
  public courseLink?: CourseInput;
  public hours?: number;
  public level?: string;
  constructor(init: PartialSubjectCourseInput) {
    this.id = init.id;
    this.description = init.description;
    this.subject = init.subject;
    this.course = init.course;
    this.subjectLink = init.subjectLink;
    this.courseLink = init.courseLink;
    this.hours = init.hours;
    this.level = init.level;
  }
}

export class SubjectCourse implements ISubjectCourse {
  public __type: 'SubjectCourse' = 'SubjectCourse';
  public id: string;
  public description?: string;
  public subject?: string;
  public course?: string;
  public subjectLink?: string;
  public courseLink?: string;
  public hours?: number;
  public level?: string;
  constructor(init: PartialSubjectCourse) {
    this.id = init.id;
    this.description = init.description;
    this.subject = init.subject;
    this.course = init.course;
    this.subjectLink = init.subjectLink;
    this.courseLink = init.courseLink;
    this.hours = init.hours;
    this.level = init.level;
  }
}

export function isSubjectCourse(obj): obj is ISubjectCourse {
  return (
    obj instanceof SubjectCourse ||
    obj.__type === 'SubjectCourse' ||
    (obj.id ||
      obj.description ||
      obj.subject ||
      obj.course ||
      obj.subjectLink ||
      obj.courseLink ||
      obj.hours ||
      obj.level)
  );
}

export type PartialSubjectCourse = {
  [P in keyof ISubjectCourse]?: ISubjectCourse[P]
};

export type PartialSubjectCourseInput = {
  [P in keyof ISubjectCourseInput]?: ISubjectCourseInput[P]
};

export interface ISubjectCourseEdge {
  cursor: String;
  node: ISubjectCourse;
}

export interface ISubjectCourseConnection {
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string;
    endCursor?: string;
    count?: number;
  };
  edges: ISubjectCourseEdge[];
}
