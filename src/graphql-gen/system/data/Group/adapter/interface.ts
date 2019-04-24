import { Connector } from 'oda-api-graphql';
import { PartialGroup } from '../types/model';

export interface GroupConnector extends Connector<PartialGroup> {
  findOneById: (id: string) => Promise<PartialGroup>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialGroup,
  ) => Promise<PartialGroup>;
  findOneByIdAndRemove: (id: string) => Promise<PartialGroup>;

  findOneByName: (name: string) => Promise<PartialGroup>;
  findOneByNameAndUpdate: (
    name: string,
    payload: PartialGroup,
  ) => Promise<PartialGroup>;
  findOneByNameAndRemove: (name: string) => Promise<PartialGroup>;

  addToCourse(args: { group?: string; course?: string }): Promise<void>;
  removeFromCourse(args: { group?: string; course?: string }): Promise<void>;

  addToStudents(args: { group?: string; student?: string }): Promise<void>;
  removeFromStudents(args: { group?: string; student?: string }): Promise<void>;

  addToCurator(args: { group?: string; curator?: string }): Promise<void>;
  removeFromCurator(args: { group?: string; curator?: string }): Promise<void>;
}
