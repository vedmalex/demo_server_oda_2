import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:Student');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import StudentSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import { PartialStudent, Student as DTO } from '../types/model';
import { StudentConnector } from './interface';

export default class Student
  extends MongooseApi<RegisterConnectors, PartialStudent>
  implements StudentConnector {
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
    super({ name: 'Student', mongoose, connectors, securityContext });
    this.initSchema('Student', StudentSchema());

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

  public async create(payload: PartialStudent) {
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

  public async addToPerson(args: { student?: string; person?: string }) {
    logger.trace(`addToPerson`);
    let opposite = await this.connectors.Person.findOneById(args.person);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.student, { person: opposite.id });
    }
  }

  public async removeFromPerson(args: { student?: string; person?: string }) {
    logger.trace(`removeFromPerson`);
    await this.findOneByIdAndUpdate(args.student, { person: null });
  }

  public async addToGroup(args: { student?: string; group?: string }) {
    logger.trace(`addToGroup`);
    let opposite = await this.connectors.Group.findOneById(args.group);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.student, { group: opposite.id });
    }
  }

  public async removeFromGroup(args: { student?: string; group?: string }) {
    logger.trace(`removeFromGroup`);
    await this.findOneByIdAndUpdate(args.student, { group: null });
  }

  public async addToMeetings(args: { student?: string; meeting?: string }) {
    logger.trace(`addToMeetings`);
    let current = await this.findOneById(args.student);
    let opposite = await this.connectors.Meeting.findOneById(args.meeting);
    if (current && opposite) {
      let update: any = {
        student: current.id,
        meeting: opposite.id,
      };

      let connection = await this.connectors.StudentAttendance.getList({
        filter: {
          student: {
            eq: current.id,
          },
          meeting: {
            eq: opposite.id,
          },
        },
      });

      if (connection.length > 0) {
        await this.connectors.StudentAttendance.findOneByIdAndUpdate(
          connection[0].id,
          update,
        );
      } else {
        await this.connectors.StudentAttendance.create(update);
      }
    }
  }

  public async removeFromMeetings(args: {
    student?: string;
    meeting?: string;
  }) {
    logger.trace(`removeFromMeetings`);
    let current = await this.findOneById(args.student);
    let opposite = await this.connectors.Meeting.findOneById(args.meeting);
    if (current && opposite) {
      let connection = await this.connectors.StudentAttendance.getList({
        filter: {
          student: {
            eq: current.id,
          },
          meeting: {
            eq: opposite.id,
          },
        },
      });

      if (connection.length > 0) {
        await this.connectors.StudentAttendance.findOneByIdAndRemove(
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

  public getPayload(args: PartialStudent, update?: boolean): PartialStudent {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.person !== undefined) {
      entity.person = args.person;
    }
    if (args.group !== undefined) {
      entity.group = args.group;
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
