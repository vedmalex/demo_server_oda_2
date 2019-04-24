import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Email');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import EmailSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialEmail, Email as DTO } from '../types/model';
import { EmailConnector } from './interface';

export default class Email extends MongooseApi<RegisterConnectors, PartialEmail>
  implements EmailConnector {
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
    super({ name: 'Email', mongoose, connectors, securityContext });
    this.initSchema('Email', EmailSchema());

    this.loaderKeys = {
      byId: 'id',
      byEmail: 'email',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byEmail: this.updateLoaders('byEmail'),
    };

    const byId = async keys => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byEmail = async keys => {
      let result = await this._getList({ filter: { email: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.email] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
      byEmail: new Dataloader(keys =>
        byEmail(keys).then(this.updaters.byEmail),
      ),
    };
  }

  public async create(payload: PartialEmail) {
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

  public async findOneByEmailAndUpdate(email: string, payload: any) {
    logger.trace(`findOneByEmailAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byEmail.load(email);
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

  public async findOneByEmailAndRemove(email: string) {
    logger.trace(`findOneByEmailAndRemove`);
    let result = await this.loaders.byEmail.load(email);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async addToPerson(args: { email?: string; person?: string }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.email, { person: opposite.id });
    }
  }

  public async removeFromPerson(args: { email?: string; person?: string }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.email, { person: null });
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public async findOneByEmail(email?: string) {
    if (email) {
      logger.trace(`findOneByEmail with ${email} `);
      let result = await this.loaders.byEmail.load(email);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public getPayload(args: PartialEmail, update?: boolean): PartialEmail {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.email !== undefined) {
      entity.email = args.email;
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
