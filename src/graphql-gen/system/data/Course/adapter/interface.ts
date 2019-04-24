import { Connector } from 'oda-api-graphql';
import { PartialCourse } from '../types/model';

export interface CourseConnector extends Connector<PartialCourse> {
  findOneById: (id: string) => Promise<PartialCourse>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialCourse,
  ) => Promise<PartialCourse>;
  findOneByIdAndRemove: (id: string) => Promise<PartialCourse>;

  findOneByName: (name: string) => Promise<PartialCourse>;
  findOneByNameAndUpdate: (
    name: string,
    payload: PartialCourse,
  ) => Promise<PartialCourse>;
  findOneByNameAndRemove: (name: string) => Promise<PartialCourse>;

  addToSubjects(args: { course?: string; subject?: string }): Promise<void>;
  removeFromSubjects(args: {
    course?: string;
    subject?: string;
  }): Promise<void>;

  addToGroups(args: { course?: string; group?: string }): Promise<void>;
  removeFromGroups(args: { course?: string; group?: string }): Promise<void>;
}
