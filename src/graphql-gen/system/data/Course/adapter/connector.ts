import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Course');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import CourseSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import { PartialCourse, Course as DTO } from '../types/model';
import { CourseConnector } from './interface';

export default class Course
  extends MongooseApi<RegisterConnectors, PartialCourse>
  implements CourseConnector {
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
    super({ name: 'Course', mongoose, connectors, securityContext });
    this.initSchema('Course', CourseSchema());

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

  public async create(payload: PartialCourse) {
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

  public async addToSubjects(args: { course?: string; subject?: string }) {
    logger.trace(`addToSubjects`);
    let current = await this.findOneById(args.course);
    let opposite = await this.connectors.Subject.findOneById(args.subject);
    if (current && opposite) {
      let update: any = {
        course: current.id,
        subject: opposite.id,
      };

      let connection = await this.connectors.SubjectCourse.getList({
        filter: {
          course: {
            eq: current.id,
          },
          subject: {
            eq: opposite.id,
          },
        },
      });

      if (connection.length > 0) {
        await this.connectors.SubjectCourse.findOneByIdAndUpdate(
          connection[0].id,
          update,
        );
      } else {
        await this.connectors.SubjectCourse.create(update);
      }
    }
  }

  public async removeFromSubjects(args: { course?: string; subject?: string }) {
    logger.trace(`removeFromSubjects`);
    let current = await this.findOneById(args.course);
    let opposite = await this.connectors.Subject.findOneById(args.subject);
    if (current && opposite) {
      let connection = await this.connectors.SubjectCourse.getList({
        filter: {
          course: {
            eq: current.id,
          },
          subject: {
            eq: opposite.id,
          },
        },
      });

      if (connection.length > 0) {
        await this.connectors.SubjectCourse.findOneByIdAndRemove(
          connection[0].id,
        );
      }
    }
  }

  public async addToGroups(args: { course?: string; group?: string }) {
    logger.trace(`addToGroups`);
    let current = await this.findOneById(args.course);
    if (current) {
      await this.connectors.Group.findOneByIdAndUpdate(args.group, {
        course: current.id,
      });
    }
  }

  public async removeFromGroups(args: { course?: string; group?: string }) {
    logger.trace(`removeFromGroups`);
    await this.connectors.Group.findOneByIdAndUpdate(args.group, {
      course: null,
    });
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

  public getPayload(args: PartialCourse, update?: boolean): PartialCourse {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.name !== undefined) {
      entity.name = args.name;
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
