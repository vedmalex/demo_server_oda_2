import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Phone');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import PhoneSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import { PartialPhone, PartialPhoneInput, Phone as DTO } from '../types/model';
import { PhoneConnector } from './interface';

export default class Phone extends MongooseApi<RegisterConnectors, PartialPhone>
  implements PhoneConnector {
  constructor({
    mongoose,
    connectors,
    securityContext,
  }: {
    mongoose: any;
    connectors: RegisterConnectors;
    securityContext: SecurityContext<RegisterConnectors>;
  }) {
    logger.trace('constructor');
    super({ name: 'Phone', mongoose, connectors, securityContext });
    this.initSchema('Phone', PhoneSchema());

    this.loaderKeys = {
      byId: 'id',
      byPhoneNumber: 'phoneNumber',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byPhoneNumber: this.updateLoaders('byPhoneNumber'),
    };

    const byId = async keys => {
      logger.trace('loader Id start with %o', keys);
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      logger.trace('loader Id finish with %o', map);
      return keys.map(id => map[id]);
    };

    const byPhoneNumber = async keys => {
      logger.trace('loader PhoneNumber start with %o', keys);
      let result = await this._getList({
        filter: { phoneNumber: { in: keys } },
      });
      let map = result.reduce((_map, item) => {
        _map[item.phoneNumber] = item;
        return _map;
      }, {});
      logger.trace('loader PhoneNumber finish with %o', map);
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
      byPhoneNumber: new Dataloader(keys =>
        byPhoneNumber(keys).then(this.updaters.byPhoneNumber),
      ),
    };
  }

  public async create(payload: PartialPhone | PartialPhoneInput) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    if (result) {
      this.storeToCache([result]);
      return this.ensureId(result.toJSON ? result.toJSON() : result);
    } else {
      const err = `connector for 'Phone': can't create item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
  }

  public async findOneByIdAndUpdate(
    id: string,
    payload: PartialPhone | PartialPhoneInput,
  ) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'Phone': can't update item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByPhoneNumberAndUpdate(
    phoneNumber: string,
    payload: PartialPhone | PartialPhoneInput,
  ) {
    logger.trace(`findOneByPhoneNumberAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'Phone': can't update item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByIdAndRemove(id: string) {
    logger.trace(`findOneByIdAndRemove`);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'Phone': can't remove item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByPhoneNumberAndRemove(phoneNumber: string) {
    logger.trace(`findOneByPhoneNumberAndRemove`);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'Phone': can't remove item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      }
    }
  }

  public async findOneByPhoneNumber(phoneNumber?: string) {
    if (phoneNumber) {
      logger.trace(`findOneByPhoneNumber with ${phoneNumber} `);
      let result = await this.loaders.byPhoneNumber.load(phoneNumber);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      }
    }
  }

  public getPayload(
    args: PartialPhone | PartialPhoneInput,
    update?: boolean,
  ): PartialPhone {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.phoneNumber !== undefined) {
      entity.phoneNumber = args.phoneNumber;
    }
    if (args.type !== undefined) {
      entity.type = args.type;
    }
    if (update) {
      delete entity.id;
      delete entity._id;
    } else {
      if (entity.id) {
        entity._id = entity.id;
        delete entity.id;
      }
    }
    return entity;
  }

  public ensureId(obj) {
    if (obj) {
      let result = super.ensureId(obj);
      return new DTO(result);
    }
  }
}
