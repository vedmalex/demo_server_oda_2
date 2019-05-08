import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Meeting');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import MeetingSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import {
  PartialMeeting,
  PartialMeetingInput,
  Meeting as DTO,
} from '../types/model';
import { MeetingConnector } from './interface';

export default class Meeting
  extends MongooseApi<RegisterConnectors, PartialMeeting>
  implements MeetingConnector {
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
    super({ name: 'Meeting', mongoose, connectors, securityContext });
    this.initSchema('Meeting', MeetingSchema());

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

  public async create(payload: PartialMeeting | PartialMeetingInput) {
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
    payload: PartialMeeting | PartialMeetingInput,
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

  public async addToCurator(args: { meeting?: string; curator?: string }) {
    logger.trace(`addToCurator`);
    let opposite = await this.connectors.Curator.findOneById(args.curator);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.meeting, { curator: opposite.id });
    } else {
      throw new Error(`can't addToCurator opposite not found`);
    }
  }

  public async removeFromCurator(args: { meeting?: string; curator?: string }) {
    logger.trace(`removeFromCurator`);
    await this.findOneByIdAndUpdate(args.meeting, { curator: null });
  }

  public async addToGroup(args: { meeting?: string; group?: string }) {
    logger.trace(`addToGroup`);
    let opposite = await this.connectors.Group.findOneById(args.group);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.meeting, { group: opposite.id });
    } else {
      throw new Error(`can't addToGroup opposite not found`);
    }
  }

  public async removeFromGroup(args: { meeting?: string; group?: string }) {
    logger.trace(`removeFromGroup`);
    await this.findOneByIdAndUpdate(args.meeting, { group: null });
  }

  public async addToStudents(args: {
    meeting?: string;
    student?: string;
    present?: boolean;
    specialNotes?: string;
    superpuper?: string;
  }) {
    logger.trace(`addToStudents`);
    let current = await this.findOneById(args.meeting);
    let opposite = await this.connectors.Student.findOneById(args.student);
    if (current && opposite) {
      let update: any = {
        meeting: current.id,
        student: opposite.id,
      };

      if (args.hasOwnProperty('present')) {
        update.present = args.present;
      }
      if (args.hasOwnProperty('specialNotes')) {
        update.specialNotes = args.specialNotes;
      }
      if (args.hasOwnProperty('superpuper')) {
        update.superpuper = args.superpuper;
      }
      let connection = await this.connectors.StudentAttendance.getList({
        filter: {
          meeting: {
            eq: current.id,
          },
          student: {
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
    } else {
      if (!opposite) throw new Error(`can't addToStudents opposite not found`);
      if (!current) throw new Error(`can't addToStudents item not found`);
    }
  }

  public async removeFromStudents(args: {
    meeting?: string;
    student?: string;
  }) {
    logger.trace(`removeFromStudents`);
    let current = await this.findOneById(args.meeting);
    let opposite = await this.connectors.Student.findOneById(args.student);
    if (current && opposite) {
      let connection = await this.connectors.StudentAttendance.getList({
        filter: {
          meeting: {
            eq: current.id,
          },
          student: {
            eq: opposite.id,
          },
        },
      });

      if (connection.length > 0) {
        await this.connectors.StudentAttendance.findOneByIdAndRemove(
          connection[0].id,
        );
      }
    } else {
      if (!opposite)
        throw new Error(`can't removeFromStudents opposite not found`);
      if (!current) throw new Error(`can't removeFromStudents item not found`);
    }
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
    args: PartialMeeting | PartialMeetingInput,
    update?: boolean,
  ): PartialMeeting {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.date !== undefined) {
      entity.date = args.date;
    }
    if (args.curator !== undefined) {
      if (typeof args.curator === 'object') {
        entity.curator = args.curator.id;
      } else {
        entity.curator = args.curator;
      }
    }
    if (args.group !== undefined) {
      if (typeof args.group === 'object') {
        entity.group = args.group.id;
      } else {
        entity.group = args.group;
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
