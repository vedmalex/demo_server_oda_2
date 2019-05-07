import { Connector } from 'oda-api-graphql';
import { PartialPhone } from '../types/model';

export interface PhoneConnector extends Connector<PartialPhone> {
  findOneById: (id: string) => Promise<PartialPhone>;
  findOneByIdAndUpdate: (
    id: string,
    payload: PartialPhone,
  ) => Promise<PartialPhone>;
  findOneByIdAndRemove: (id: string) => Promise<PartialPhone>;

  findOneByPhoneNumber: (phoneNumber: string) => Promise<PartialPhone>;
  findOneByPhoneNumberAndUpdate: (
    phoneNumber: string,
    payload: PartialPhone,
  ) => Promise<PartialPhone>;
  findOneByPhoneNumberAndRemove: (phoneNumber: string) => Promise<PartialPhone>;
}
