import { Connector } from 'oda-api-graphql';
import { PartialSubject } from '../types/model';

export interface SubjectConnector extends Connector<PartialSubject> {
  findOneById: (id: string) => Promise<PartialSubject>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialSubject,
  ) => Promise<PartialSubject>;
  findOneByIdAndRemove: (id: string) => Promise<PartialSubject>;

  findOneByName: (name: string) => Promise<PartialSubject>;
  findOneByNameAndUpdate: (
    name: string,
    payload: PartialSubject,
  ) => Promise<PartialSubject>;
  findOneByNameAndRemove: (name: string) => Promise<PartialSubject>;

  addToCourses(args: {
    subject?: string;
    course?: string;
    hours?: number;
    level?: string;
  }): Promise<void>;
  removeFromCourses(args: {
    subject?: string;
    course?: string;
    hours?: number;
    level?: string;
  }): Promise<void>;
}
