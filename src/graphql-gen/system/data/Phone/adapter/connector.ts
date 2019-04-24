import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Phone');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import PhoneSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialPhone, Phone as DTO } from '../types/model';
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
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byPhoneNumber = async keys => {
      let result = await this._getList({
        filter: { phoneNumber: { in: keys } },
      });
      let map = result.reduce((_map, item) => {
        _map[item.phoneNumber] = item;
        return _map;
      }, {});
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

  public async create(payload: PartialPhone) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    this.storeToCache([result]);
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByIdAndUpdate(id: string, payload: any) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByPhoneNumberAndUpdate(
    phoneNumber: string,
    payload: any,
  ) {
    logger.trace(`findOneByPhoneNumberAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByIdAndRemove(id: string) {
    logger.trace(`findOneByIdAndRemove`);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByPhoneNumberAndRemove(phoneNumber: string) {
    logger.trace(`findOneByPhoneNumberAndRemove`);
    let result = await this.loaders.byPhoneNumber.load(phoneNumber);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async addToPerson(args: { phone?: string; person?: string }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.phone, { person: opposite.id });
    }
  }

  public async removeFromPerson(args: { phone?: string; person?: string }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.phone, { person: null });
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public async findOneByPhoneNumber(phoneNumber?: string) {
    if (phoneNumber) {
      logger.trace(`findOneByPhoneNumber with ${phoneNumber} `);
      let result = await this.loaders.byPhoneNumber.load(phoneNumber);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public getPayload(args: PartialPhone, update?: boolean): PartialPhone {
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
    if (args.person !== undefined) {
      entity.person = args.person;
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
