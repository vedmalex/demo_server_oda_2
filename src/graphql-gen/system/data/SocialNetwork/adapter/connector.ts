import getLogger from 'oda-logger';
let logger = getLogger('api:connector:SocialNetwork');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import SocialNetworkSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import {
  PartialSocialNetwork,
  PartialSocialNetworkInput,
  SocialNetwork as DTO,
} from '../types/model';
import { SocialNetworkConnector } from './interface';

export default class SocialNetwork
  extends MongooseApi<RegisterConnectors, PartialSocialNetwork>
  implements SocialNetworkConnector {
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
    super({ name: 'SocialNetwork', mongoose, connectors, securityContext });
    this.initSchema('SocialNetwork', SocialNetworkSchema());

    this.loaderKeys = {
      byId: 'id',
      byAccount: 'account',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byAccount: this.updateLoaders('byAccount'),
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

    const byAccount = async keys => {
      logger.trace('loader Account start with %o', keys);
      let result = await this._getList({ filter: { account: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.account] = item;
        return _map;
      }, {});
      logger.trace('loader Account finish with %o', map);
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
      byAccount: new Dataloader(keys =>
        byAccount(keys).then(this.updaters.byAccount),
      ),
    };
  }

  public async create(
    payload: PartialSocialNetwork | PartialSocialNetworkInput,
  ) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    if (result) {
      this.storeToCache([result]);
      return this.ensureId(result.toJSON ? result.toJSON() : result);
    } else {
      const err = `connector for 'SocialNetwork': can't create item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
  }

  public async findOneByIdAndUpdate(
    id: string,
    payload: PartialSocialNetwork | PartialSocialNetworkInput,
  ) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'SocialNetwork': can't update item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByAccountAndUpdate(
    account: string,
    payload: PartialSocialNetwork | PartialSocialNetworkInput,
  ) {
    logger.trace(`findOneByAccountAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byAccount.load(account);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'SocialNetwork': can't update item due to some issue`;
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
      const err = `connector for 'SocialNetwork': can't remove item due to some issue`;
      logger.error(err);
      throw new Error(err);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByAccountAndRemove(account: string) {
    logger.trace(`findOneByAccountAndRemove`);
    let result = await this.loaders.byAccount.load(account);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      const err = `connector for 'SocialNetwork': can't remove item due to some issue`;
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

  public async findOneByAccount(account?: string) {
    if (account) {
      logger.trace(`findOneByAccount with ${account} `);
      let result = await this.loaders.byAccount.load(account);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      }
    }
  }

  public getPayload(
    args: PartialSocialNetwork | PartialSocialNetworkInput,
    update?: boolean,
  ): PartialSocialNetwork {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.account !== undefined) {
      entity.account = args.account;
    }
    if (args.url !== undefined) {
      entity.url = args.url;
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
