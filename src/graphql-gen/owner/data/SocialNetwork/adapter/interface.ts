import { Connector } from 'oda-api-graphql';
import { PartialSocialNetwork } from '../types/model';

export interface SocialNetworkConnector
  extends Connector<PartialSocialNetwork> {
  findOneById: (id: string) => Promise<PartialSocialNetwork>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialSocialNetwork,
  ) => Promise<PartialSocialNetwork>;
  findOneByIdAndRemove: (id: string) => Promise<PartialSocialNetwork>;

  findOneByAccount: (account: string) => Promise<PartialSocialNetwork>;
  findOneByAccountAndUpdate: (
    account: string,
    payload: PartialSocialNetwork,
  ) => Promise<PartialSocialNetwork>;
  findOneByAccountAndRemove: (account: string) => Promise<PartialSocialNetwork>;

  addToPerson(args: { socialNetwork?: string; person?: string }): Promise<void>;
  removeFromPerson(args: {
    socialNetwork?: string;
    person?: string;
  }): Promise<void>;

  addToCreatedBy(args: {
    socialNetwork?: string;
    user?: string;
  }): Promise<void>;
  removeFromCreatedBy(args: {
    socialNetwork?: string;
    user?: string;
  }): Promise<void>;

  addToUpdateBy(args: { socialNetwork?: string; user?: string }): Promise<void>;
  removeFromUpdateBy(args: {
    socialNetwork?: string;
    user?: string;
  }): Promise<void>;
}
