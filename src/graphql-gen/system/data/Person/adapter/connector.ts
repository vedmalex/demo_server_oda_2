import getLogger from 'oda-logger';
let logger = getLogger('api:connector:Person');

import { MongooseApi } from 'oda-api-graphql-mongoose';
import { SecurityContext } from 'oda-api-graphql';
import PersonSchema from './schema';
import RegisterConnectors from '../../registerConnectors';
import Dataloader from 'dataloader';

import {
  PartialPerson,
  PartialPersonInput,
  Person as DTO,
} from '../types/model';
import { PersonConnector } from './interface';

import { PartialSocialNetwork } from './../../SocialNetwork/types/model';

import { PartialPhone } from './../../Phone/types/model';

import { PartialEmail } from './../../Email/types/model';

export default class Person
  extends MongooseApi<RegisterConnectors, PartialPerson>
  implements PersonConnector {
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
    super({ name: 'Person', mongoose, connectors, securityContext });
    this.initSchema('Person', PersonSchema());

    this.loaderKeys = {
      byId: 'id',
      bySpiritualName: 'spiritualName',
      byFullName: 'fullName',
    };

    this.updaters = {
      byId: this.updateLoaders('byId'),
      bySpiritualName: this.updateLoaders('bySpiritualName'),
      byFullName: this.updateLoaders('byFullName'),
    };

    const byId = async keys => {
      let result = await this._getList({ filter: { id: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.id] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const bySpiritualName = async keys => {
      let result = await this._getList({
        filter: { spiritualName: { in: keys } },
      });
      let map = result.reduce((_map, item) => {
        _map[item.spiritualName] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    const byFullName = async keys => {
      let result = await this._getList({ filter: { fullName: { in: keys } } });
      let map = result.reduce((_map, item) => {
        _map[item.fullName] = item;
        return _map;
      }, {});
      return keys.map(id => map[id]);
    };

    this.loaders = {
      byId: new Dataloader(keys => byId(keys).then(this.updaters.byId), {
        cacheKeyFn: key => (typeof key !== 'object' ? key : key.toString()),
      }),
      bySpiritualName: new Dataloader(keys =>
        bySpiritualName(keys).then(this.updaters.bySpiritualName),
      ),
      byFullName: new Dataloader(keys =>
        byFullName(keys).then(this.updaters.byFullName),
      ),
    };
  }

  public async create(payload: PartialPerson | PartialPersonInput) {
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
    payload: PartialPerson | PartialPersonInput,
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

  public async findOneBySpiritualNameAndUpdate(
    spiritualName: string,
    payload: PartialPerson | PartialPersonInput,
  ) {
    logger.trace(`findOneBySpiritualNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.bySpiritualName.load(spiritualName);
    if (result) {
      result = await this.updateSecure(result, entity);
      this.storeToCache([result]);
    } else {
      throw new Error(`can't update item due to some issue`);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByFullNameAndUpdate(
    fullName: string,
    payload: PartialPerson | PartialPersonInput,
  ) {
    logger.trace(`findOneByFullNameAndUpdate`);
    let entity = this.getPayload(payload, true);
    let result = await this.loaders.byFullName.load(fullName);
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

  public async findOneBySpiritualNameAndRemove(spiritualName: string) {
    logger.trace(`findOneBySpiritualNameAndRemove`);
    let result = await this.loaders.bySpiritualName.load(spiritualName);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      throw new Error(`can't remove item due to some issue`);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async findOneByFullNameAndRemove(fullName: string) {
    logger.trace(`findOneByFullNameAndRemove`);
    let result = await this.loaders.byFullName.load(fullName);
    if (result) {
      result = await this.removeSecure(result);
      this.storeToCache([result]);
    } else {
      throw new Error(`can't remove item due to some issue`);
    }
    return this.ensureId(result.toJSON ? result.toJSON() : result);
  }

  public async addToUser(args: { person?: string; user?: string }) {
    logger.trace(`addToUser`);
    let opposite = await this.connectors.User.findOneById(args.user);
    if (opposite) {
      await this.findOneByIdAndUpdate(args.person, { user: opposite.id });
    } else {
      throw new Error(`can't addToUser opposite not found`);
    }
  }

  public async removeFromUser(args: { person?: string; user?: string }) {
    logger.trace(`removeFromUser`);
    await this.findOneByIdAndUpdate(args.person, { user: null });
  }

  public async addToAsStudents(args: { person?: string; student?: string }) {
    logger.trace(`addToAsStudents`);
    let current = await this.findOneById(args.person);
    if (current) {
      await this.connectors.Student.findOneByIdAndUpdate(args.student, {
        person: current.id,
      });
    } else {
      throw new Error(`can't addToAsStudents item not found`);
    }
  }

  public async removeFromAsStudents(args: {
    person?: string;
    student?: string;
  }) {
    logger.trace(`removeFromAsStudents`);
    await this.connectors.Student.findOneByIdAndUpdate(args.student, {
      person: null,
    });
  }

  public async addToAsCurator(args: { person?: string; curator?: string }) {
    logger.trace(`addToAsCurator`);
    let current = await this.findOneById(args.person);
    if (current) {
      await this.connectors.Curator.findOneByIdAndUpdate(args.curator, {
        person: current.id,
      });
    } else {
      throw new Error(`can't addToAsCurator item not found`);
    }
  }

  public async removeFromAsCurator(args: {
    person?: string;
    curator?: string;
  }) {
    logger.trace(`removeFromAsCurator`);
    await this.connectors.Curator.findOneByIdAndUpdate(args.curator, {
      person: null,
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

  public async findOneBySpiritualName(spiritualName?: string) {
    if (spiritualName) {
      logger.trace(`findOneBySpiritualName with ${spiritualName} `);
      let result = await this.loaders.bySpiritualName.load(spiritualName);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      } else {
        throw new Error(`can't findOneBySpiritualName with ${spiritualName}`);
      }
    }
  }

  public async findOneByFullName(fullName?: string) {
    if (fullName) {
      logger.trace(`findOneByFullName with ${fullName} `);
      let result = await this.loaders.byFullName.load(fullName);
      if (result) {
        return this.ensureId(result.toJSON ? result.toJSON() : result);
      } else {
        throw new Error(`can't findOneByFullName with ${fullName}`);
      }
    }
  }

  public getPayload(
    args: PartialPerson | PartialPersonInput,
    update?: boolean,
  ): PartialPerson {
    let entity: any = {};
    if (args.id !== undefined) {
      entity.id = args.id;
    }
    if (args.spiritualName !== undefined) {
      entity.spiritualName = args.spiritualName;
    }
    if (args.fullName !== undefined) {
      entity.fullName = args.fullName;
    }
    if (args.dateOfBirth !== undefined) {
      entity.dateOfBirth = args.dateOfBirth;
    }
    if (args.user !== undefined) {
      if (typeof args.user === 'object') {
        entity.user = args.user.id;
      } else {
        entity.user = args.user;
      }
    }
    if (args.socialNetworks !== undefined) {
      entity.socialNetworks = args.socialNetworks;
    }
    if (args.phones !== undefined) {
      entity.phones = args.phones;
    }
    if (args.emails !== undefined) {
      entity.emails = args.emails;
    }
    if (args.specialNotes !== undefined) {
      entity.specialNotes = args.specialNotes;
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
