import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Group');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import GroupSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import { PartialGroup, PartialGroupInput, Group as DTO } from '../types/model';
import { GroupConnector } from './interface';

export default class Group extends MongooseApi<RegisterConnectors, PartialGroup>
  implements GroupConnector {
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
    super({ name: 'Group', mongoose, connectors, securityContext });
    this.initSchema('Group', GroupSchema());

    this.loaderKeys = {
      byId: 'id',
      byName: 'name',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      byName: this.updateLoaders('byName'),
    };

    const byId = async keys => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byName = async keys => {
      let result = await this._getList({ filter: { name: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.name] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
      byName: new Dataloader(keys => byName(keys).then(this.updaters.byName)),
    };
  }

  public async create(payload: PartialGroup | PartialGroupInput) {
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
    payload: PartialGroup | PartialGroupInput,
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

  public async findOneByNameAndUpdate(
    name: string,
    payload: PartialGroup | PartialGroupInput,
  ) {
    logger.trace(`findOneByNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byName.load(name);
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

  public async findOneByNameAndRemove(name: string) {
    logger.trace(`findOneByNameAndRemove`);
    let result = await this.loaders.byName.load(name);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      throw new Error(`can't remove item due to some issue`);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async addToCourse(args: { group?: string; course?: string }) {
    logger.trace(`addToCourse`);
    let opposite = await this.connectors.Course.findOneById(args.course);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.group, { course: opposite.id });
    } else {
      throw new Error(`can't addToCourse opposite not found`);
    }
  }

  public async removeFromCourse(args: { group?: string; course?: string }) {
    logger.trace(`removeFromCourse`);
    await this.findOneByIdAndUpdate(args.group, { course: null });
  }

  public async addToStudents(args: { group?: string; student?: string }) {
    logger.trace(`addToStudents`);
    let current = await this.findOneById(args.group);
    if (current) {
      await this.connectors.Student.findOneByIdAndUpdate(args.student, {
        group: current.id,
      });
    } else {
      throw new Error(`can't addToStudents item not found`);
    }
  }

  public async removeFromStudents(args: { group?: string; student?: string }) {
    logger.trace(`removeFromStudents`);
    await this.connectors.Student.findOneByIdAndUpdate(args.student, {
      group: null,
    });
  }

  public async addToCurator(args: { group?: string; curator?: string }) {
    logger.trace(`addToCurator`);
    let opposite = await this.connectors.Curator.findOneById(args.curator);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.group, { curator: opposite.id });
    } else {
      throw new Error(`can't addToCurator opposite not found`);
    }
  }

  public async removeFromCurator(args: { group?: string; curator?: string }) {
    logger.trace(`removeFromCurator`);
    await this.findOneByIdAndUpdate(args.group, { curator: null });
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

  public async findOneByName(name?: string) {
    if (name) {
      logger.trace(`findOneByName with ${name} `);
      let result = await this.loaders.byName.load(name);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      } else {
        throw new Error(`can't findOneByName with ${name}`);
      }
    }
  }

  public getPayload(
    args: PartialGroup | PartialGroupInput,
    update?: boolean,
  ): PartialGroup {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.name !== undefined) {
      entity.name = args.name;
    }
    if (args.course !== undefined) {
      if (typeof args.course === 'object') {
        entity.course = args.course.id;
      } else {
        entity.course = args.course;
      }
    }
    if (args.curator !== undefined) {
      if (typeof args.curator === 'object') {
        entity.curator = args.curator.id;
      } else {
        entity.curator = args.curator;
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
