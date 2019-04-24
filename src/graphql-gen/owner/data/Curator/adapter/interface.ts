import { Connector } from 'oda-api-graphql';
import { PartialCurator } from '../types/model';

export interface CuratorConnector extends Connector<PartialCurator> {
  findOneById: (id: string) => Promise<PartialCurator>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialCurator,
  ) => Promise<PartialCurator>;
  findOneByIdAndRemove: (id: string) => Promise<PartialCurator>;

  addToPerson(args: { curator?: string; person?: string }): Promise<void>;
  removeFromPerson(args: { curator?: string; person?: string }): Promise<void>;

  addToGroups(args: { curator?: string; group?: string }): Promise<void>;
  removeFromGroups(args: { curator?: string; group?: string }): Promise<void>;

  addToCreatedBy(args: { curator?: string; user?: string }): Promise<void>;
  removeFromCreatedBy(args: { curator?: string; user?: string }): Promise<void>;

  addToUpdateBy(args: { curator?: string; user?: string }): Promise<void>;
  removeFromUpdateBy(args: { curator?: string; user?: string }): Promise<void>;
}
