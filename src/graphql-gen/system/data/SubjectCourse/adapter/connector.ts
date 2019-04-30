import getLogger from 'oda-logger';
let logger = getLogger('api:connector:SubjectCourse');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import SubjectCourseSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import { PartialSubjectCourse, SubjectCourse as DTO } from '../types/model';
import { SubjectCourseConnector } from './interface';

export default class SubjectCourse
  extends MongooseApi<RegisterConnectors, PartialSubjectCourse>
  implements SubjectCourseConnector {
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
    super({ name: 'SubjectCourse', mongoose, connectors, securityContext });
    this.initSchema('SubjectCourse', SubjectCourseSchema());

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

  public async create(payload: PartialSubjectCourse) {
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

  public async findOneByIdAndRemove(id: string) {
    logger.trace(`findOneByIdAndRemove`);
    let result = await this.loaders.byId.load(id);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    }
    return this.ensureId(result && result.toJSON ? result.toJSON() : result);
  }

  public async addToSubjectLink(args: {
    subjectCourse?: string;
    subject?: string;
  }) {
    logger.trace(`addToSubjectLink`);
    let opposite = await this.connectors.Subject.findOneById(args.subject);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.subjectCourse, {
        subject: opposite.id,
      });
    }
  }

  public async removeFromSubjectLink(args: {
    subjectCourse?: string;
    subject?: string;
  }) {
    logger.trace(`removeFromSubjectLink`);
    await this.findOneByIdAndUpdate(args.subjectCourse, { subject: null });
  }

  public async addToCourseLink(args: {
    subjectCourse?: string;
    course?: string;
  }) {
    logger.trace(`addToCourseLink`);
    let opposite = await this.connectors.Course.findOneById(args.course);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.subjectCourse, {
        course: opposite.id,
      });
    }
  }

  public async removeFromCourseLink(args: {
    subjectCourse?: string;
    course?: string;
  }) {
    logger.trace(`removeFromCourseLink`);
    await this.findOneByIdAndUpdate(args.subjectCourse, { course: null });
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public getPayload(
    args: PartialSubjectCourse,
    update?: boolean,
  ): PartialSubjectCourse {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.description !== undefined) {
      entity.description = args.description;
    }
    if (args.subject !== undefined) {
      entity.subject = args.subject;
    }
    if (args.course !== undefined) {
      entity.course = args.course;
    }
    if (args.subjectLink !== undefined) {
      entity.subjectLink = args.subjectLink;
    }
    if (args.courseLink !== undefined) {
      entity.courseLink = args.courseLink;
    }
    if (args.hours !== undefined) {
      entity.hours = args.hours;
    }
    if (args.level !== undefined) {
      entity.level = args.level;
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
