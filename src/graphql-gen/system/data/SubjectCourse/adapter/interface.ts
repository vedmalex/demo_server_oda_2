import { Connector } from 'oda-api-graphql';
import { PartialSubjectCourse } from '../types/model';

export interface SubjectCourseConnector
  extends Connector<PartialSubjectCourse> {
  findOneById: (id: string) => Promise<PartialSubjectCourse>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialSubjectCourse,
  ) => Promise<PartialSubjectCourse>;
  findOneByIdAndRemove: (id: string) => Promise<PartialSubjectCourse>;

  addToSubjectLink(args: {
    subjectCourse?: string;
    subject?: string;
  }): Promise<void>;
  removeFromSubjectLink(args: {
    subjectCourse?: string;
    subject?: string;
  }): Promise<void>;

  addToCourseLink(args: {
    subjectCourse?: string;
    course?: string;
  }): Promise<void>;
  removeFromCourseLink(args: {
    subjectCourse?: string;
    course?: string;
  }): Promise<void>;

  addToCreatedBy(args: {
    subjectCourse?: string;
    user?: string;
  }): Promise<void>;
  removeFromCreatedBy(args: {
    subjectCourse?: string;
    user?: string;
  }): Promise<void>;

  addToUpdateBy(args: { subjectCourse?: string; user?: string }): Promise<void>;
  removeFromUpdateBy(args: {
    subjectCourse?: string;
    user?: string;
  }): Promise<void>;
}
