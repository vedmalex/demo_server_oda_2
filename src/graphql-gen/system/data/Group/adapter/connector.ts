import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Group');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import GroupSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialGroup, Group as DTO } from '../types/model';
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

  public async create(payload: PartialGroup) {
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

  public async findOneByNameAndUpdate(name: string, payload: any) {
    logger.trace(`findOneByNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byName.load(name);
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

  public async findOneByNameAndRemove(name: string) {
    logger.trace(`findOneByNameAndRemove`);
    let result = await this.loaders.byName.load(name);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async addToCourse(args: { group?: string; course?: string }) {
    logger.trace(`addToCourse`);
    let opposite = await this.connectors.Course.findOneById(args.course);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.group, { course: opposite.id });
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
    }
  }

  public async removeFromCurator(args: { group?: string; curator?: string }) {
    logger.trace(`removeFromCurator`);
    await this.findOneByIdAndUpdate(args.group, { curator: null });
  }

  public async addToCreatedBy(args: { group?: string; user?: string }) {
    logger.trace(`addToCreatedBy`);
    let opposite = await this.connectors.User.findOneById(args.user);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.group, { createdBy: opposite.id });
    }
  }

  public async removeFromCreatedBy(args: { group?: string; user?: string }) {
    logger.trace(`removeFromCreatedBy`);
    await this.findOneByIdAndUpdate(args.group, { createdBy: null });
  }

  public async addToUpdateBy(args: { group?: string; user?: string }) {
    logger.trace(`addToUpdateBy`);
    let opposite = await this.connectors.User.findOneById(args.user);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.group, { updateBy: opposite.id });
    }
  }

  public async removeFromUpdateBy(args: { group?: string; user?: string }) {
    logger.trace(`removeFromUpdateBy`);
    await this.findOneByIdAndUpdate(args.group, { updateBy: null });
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public async findOneByName(name?: string) {
    if (name) {
      logger.trace(`findOneByName with ${name} `);
      let result = await this.loaders.byName.load(name);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public getPayload(args: PartialGroup, update?: boolean): PartialGroup {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.name !== undefined) {
      entity.name = args.name;
    }
    if (args.course !== undefined) {
      entity.course = args.course;
    }
    if (args.curator !== undefined) {
      entity.curator = args.curator;
    }
    if (args.createdBy !== undefined) {
      entity.createdBy = args.createdBy;
    }
    if (args.updateBy !== undefined) {
      entity.updateBy = args.updateBy;
    }
    if (args.createdAt !== undefined) {
      entity.createdAt = args.createdAt;
    }
    if (args.updatedAt !== undefined) {
      entity.updatedAt = args.updatedAt;
    }
    if (args.removed !== undefined) {
      entity.removed = args.removed;
    }
    if (args.owner !== undefined) {
      entity.owner = args.owner;
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
