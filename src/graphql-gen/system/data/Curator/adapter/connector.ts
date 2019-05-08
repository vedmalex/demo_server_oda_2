import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Curator');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import CuratorSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import {
  PartialCurator,
  PartialCuratorInput,
  Curator as DTO,
} from '../types/model';
import { CuratorConnector } from './interface';

export default class Curator
  extends MongooseApi<RegisterConnectors, PartialCurator>
  implements CuratorConnector {
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
    super({ name: 'Curator', mongoose, connectors, securityContext });
    this.initSchema('Curator', CuratorSchema());

    this.loaderKeys = {
      byId: 'id',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
    };

    const byId = async keys => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
    };
  }

  public async create(payload: PartialCurator | PartialCuratorInput) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    if (result) {
      this.storeToCache([result]);
      return this.ensureId(result.toJSON ? result.toJSON() : result);
    } else {
      throw new Error(`can't create item due to some issue`);
    }
  }

  public async findOneByIdAndUpdate(
    id: string,
    payload: PartialCurator | PartialCuratorInput,
  ) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      throw new Error(`can't update item due to some issue`);
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
      throw new Error(`can't remove item due to some issue`);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async addToPerson(args: { curator?: string; person?: string }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.curator, { person: opposite.id });
    } else {
      throw new Error(`can't addToPerson opposite not found`);
    }
  }

  public async removeFromPerson(args: { curator?: string; person?: string }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.curator, { person: null });
  }

  public async addToGroups(args: { curator?: string; group?: string }) {
    logger.trace(`addToGroups`);
    let current = await this.findOneById(args.curator);
    if (current) {
      await this.connectors.Group.findOneByIdAndUpdate(args.group, {
        curator: current.id,
      });
    } else {
      throw new Error(`can't addToGroups item not found`);
    }
  }

  public async removeFromGroups(args: { curator?: string; group?: string }) {
    logger.trace(`removeFromGroups`);
    await this.connectors.Group.findOneByIdAndUpdate(args.group, {
      curator: null,
    });
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      } else {
        throw new Error(`can't findOneById with ${id}`);
      }
    }
  }

  public getPayload(
    args: PartialCurator | PartialCuratorInput,
    update?: boolean,
  ): PartialCurator {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.person !== undefined) {
      if (typeof args.person === 'object') {
        entity.person = args.person.id;
      } else {
        entity.person = args.person;
      }
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
