import * as log4js from 'log4js';
let logger = log4js.getLogger('api:connector:StudentAttendance');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import StudentAttendanceSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import * as Dataloader from 'dataloader';

import {
  PartialStudentAttendance,
  StudentAttendance as DTO,
} from '../types/model';
import { StudentAttendanceConnector } from './interface';

export default class StudentAttendance
  extends MongooseApi<RegisterConnectors, PartialStudentAttendance>
  implements StudentAttendanceConnector {
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
    super({ name: 'StudentAttendance', mongoose, connectors, securityContext });
    this.initSchema('StudentAttendance', StudentAttendanceSchema());

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

  public async create(payload: PartialStudentAttendance) {
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

  public async addToMeetingLink(args: {
    studentAttendance?: string;
    meeting?: string;
  }) {
    logger.trace(`addToMeetingLink`);
    let opposite = await this.connectors.Meeting.findOneById(args.meeting);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.studentAttendance, {
        meeting: opposite.id,
      });
    }
  }

  public async removeFromMeetingLink(args: {
    studentAttendance?: string;
    meeting?: string;
  }) {
    logger.trace(`removeFromMeetingLink`);
    await this.findOneByIdAndUpdate(args.studentAttendance, { meeting: null });
  }

  public async addToStudentLink(args: {
    studentAttendance?: string;
    student?: string;
  }) {
    logger.trace(`addToStudentLink`);
    let opposite = await this.connectors.Student.findOneById(args.student);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.studentAttendance, {
        student: opposite.id,
      });
    }
  }

  public async removeFromStudentLink(args: {
    studentAttendance?: string;
    student?: string;
  }) {
    logger.trace(`removeFromStudentLink`);
    await this.findOneByIdAndUpdate(args.studentAttendance, { student: null });
  }

  public async findOneById(id?: string) {
    if (id) {
      logger.trace(`findOneById with ${id} `);
      let result = await this.loaders.byId.load(id);
      return this.ensureId(result && result.toJSON ? result.toJSON() : result);
    }
  }

  public getPayload(
    args: PartialStudentAttendance,
    update?: boolean,
  ): PartialStudentAttendance {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.meeting !== undefined) {
      entity.meeting = args.meeting;
    }
    if (args.student !== undefined) {
      entity.student = args.student;
    }
    if (args.meetingLink !== undefined) {
      entity.meetingLink = args.meetingLink;
    }
    if (args.studentLink !== undefined) {
      entity.studentLink = args.studentLink;
    }
    if (args.present !== undefined) {
      entity.present = args.present;
    }
    if (args.specialNotes !== undefined) {
      entity.specialNotes = args.specialNotes;
    }
    if (args.superpuper !== undefined) {
      entity.superpuper = args.superpuper;
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
