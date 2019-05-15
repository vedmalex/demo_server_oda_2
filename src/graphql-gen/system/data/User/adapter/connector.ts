import getLogger from 'oda-logger';
let logger = getLogger('api:connector:User');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import UserSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import { PartialUser, PartialUserInput, User as DTO } from '../types/model';
import { UserConnector } from './interface';

export default class User extends MongooseApi<RegisterConnectors, PartialUser>
  implements UserConnector {
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
    super({ name: 'User', mongoose, connectors, securityContext });
    this.initSchema('User', UserSchema());

    this.loaderKeys = {
      byId: 'id',
      byUserName: 'userName',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byUserName: this.updateLoaders('byUserName'),
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

    const byUserName = async keys => {
      logger.trace('loader UserName start with %o', keys);
      let result = await this._getList({ filter: { userName: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.userName] = item;
        return _map;
      }, {});
      logger.trace('loader UserName finish with %o', map);
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
      byUserName: new Dataloader(keys =>
        byUserName(keys).then(this.updaters.byUserName),
      ),
    };
  }

  public async create(payload: PartialUser | PartialUserInput) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    if (result) {
      this.storeToCache([result]);
      return this.ensureId(result.toJSON ? result.toJSON() : result);
    } else {
      const err = `connector for 'User': can't create item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
  }

  public async findOneByIdAndUpdate(
    id: string,
    payload: PartialUser | PartialUserInput,
  ) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'User': can't update item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByUserNameAndUpdate(
    userName: string,
    payload: PartialUser | PartialUserInput,
  ) {
    logger.trace(`findOneByUserNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byUserName.load(userName);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'User': can't update item due to some issue`;
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
      const err = `connector for 'User': can't remove item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByUserNameAndRemove(userName: string) {
    logger.trace(`findOneByUserNameAndRemove`);
    let result = await this.loaders.byUserName.load(userName);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'User': can't remove item due to some issue`;
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

  public async findOneByUserName(userName?: string) {
    if (userName) {
      logger.trace(`findOneByUserName with ${userName} `);
      let result = await this.loaders.byUserName.load(userName);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      }
    }
  }

  public getPayload(
    args: PartialUser | PartialUserInput,
    update?: boolean,
  ): PartialUser {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.userName !== undefined) {
      entity.userName = args.userName;
    }
    if (args.password !== undefined) {
      entity.password = args.password;
    }
    if (args.isAdmin !== undefined) {
      entity.isAdmin = args.isAdmin;
    }
    if (args.isSystem !== undefined) {
      entity.isSystem = args.isSystem;
    }
    if (args.enabled !== undefined) {
      entity.enabled = args.enabled;
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
