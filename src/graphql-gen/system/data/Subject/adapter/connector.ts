import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Subject');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import SubjectSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import {
  PartialSubject,
  PartialSubjectInput,
  Subject as DTO,
} from '../types/model';
import { SubjectConnector } from './interface';

export default class Subject
  extends MongooseApi<RegisterConnectors, PartialSubject>
  implements SubjectConnector {
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
    super({ name: 'Subject', mongoose, connectors, securityContext });
    this.initSchema('Subject', SubjectSchema());

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

  public async create(payload: PartialSubject | PartialSubjectInput) {
    logger.trace('create');
    let entity = this.getPayload(payload);
    let result = await this.createSecure(entity);
    this.storeToCache([result]);
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByIdAndUpdate(
    id: string,
    payload: PartialSubject | PartialSubjectInput,
  ) {
    logger.trace(`findOneByIdAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async findOneByNameAndUpdate(
    name: string,
    payload: PartialSubject | PartialSubjectInput,
  ) {
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

  public async addToCourses(args: {
    subject?: string;
    course?: string;
    hours?: number;
    level?: string;
  }) {
    logger.trace(`addToCourses`);
    let current = await this.findOneById(args.subject);
    let opposite = await this.connectors.Course.findOneById(args.course);
    if (current && opposite) {
      let update: any = {
        subject: current.id,
        course: opposite.id,
      };

      if (args.hasOwnProperty('hours')) {
        update.hours = args.hours;
      }
      if (args.hasOwnProperty('level')) {
        update.level = args.level;
      }
      let connection = await this.connectors.SubjectCourse.getList({
        filter: {
          subject: {
            eq: current.id,
          },
          course: {
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

  public async removeFromCourses(args: { subject?: string; course?: string }) {
    logger.trace(`removeFromCourses`);
    let current = await this.findOneById(args.subject);
    let opposite = await this.connectors.Course.findOneById(args.course);
    if (current && opposite) {
      let connection = await this.connectors.SubjectCourse.getList({
        filter: {
          subject: {
            eq: current.id,
          },
          course: {
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

  public getPayload(
    args: PartialSubject | PartialSubjectInput,
    update?: boolean,
  ): PartialSubject {
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
