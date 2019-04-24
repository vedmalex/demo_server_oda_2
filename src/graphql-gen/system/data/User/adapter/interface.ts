import { Connector } from 'oda-api-graphql';
import { PartialUser } from '../types/model';

export interface UserConnector extends Connector<PartialUser> {
  findOneById: (id: string) => Promise<PartialUser>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialUser,
  ) => Promise<PartialUser>;
  findOneByIdAndRemove: (id: string) => Promise<PartialUser>;

  findOneByUserName: (userName: string) => Promise<PartialUser>;
  findOneByUserNameAndUpdate: (
    userName: string,
    payload: PartialUser,
  ) => Promise<PartialUser>;
  findOneByUserNameAndRemove: (userName: string) => Promise<PartialUser>;
}
