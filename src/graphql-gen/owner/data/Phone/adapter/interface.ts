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

  addToPerson(args: { phone?: string; person?: string }): Promise<void>;
  removeFromPerson(args: { phone?: string; person?: string }): Promise<void>;

  addToCreatedBy(args: { phone?: string; user?: string }): Promise<void>;
  removeFromCreatedBy(args: { phone?: string; user?: string }): Promise<void>;

  addToUpdateBy(args: { phone?: string; user?: string }): Promise<void>;
  removeFromUpdateBy(args: { phone?: string; user?: string }): Promise<void>;
}
