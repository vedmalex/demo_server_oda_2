import User from './User/adapter/connector';
import { UserConnector } from './User/adapter/interface';

import { acl, ACLCheck, SecurityContext } from 'oda-api-graphql';

export default class RegisterConnectors {
  public get User(): UserConnector {
    return this.InitUser();
  }

  public InitUser(): UserConnector {
    if (!this._User) {
      this._User = new User({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._User;
  }

  protected _User: UserConnector;

  public mongoose;
  public sequelize;
  public userGQL;
  public systemGQL;

  public securityContext: SecurityContext<RegisterConnectors>;

  public initGQL({ userGQL, systemGQL }: { userGQL?; systemGQL? }) {
    this.userGQL = userGQL ? userGQL : this.userGQL;
    this.systemGQL = systemGQL ? systemGQL : this.systemGQL;
  }

  protected _defaultAccess(
    context,
    obj: {
      source?: any;
      payload?: any;
    },
  ): object {
    let result = obj.source;
    return result;
  }

  protected _defaultCreate(
    context,
    obj: {
      source?: any;
      payload?: any;
    },
  ): object {
    let result = obj.payload;
    return result;
  }

  constructor({
    user,
    owner,
    mongoose,
    sequelize,
    acls,
    userGroup,
    userGQL,
    systemGQL,
  }: {
    user?: any;
    owner?: any;
    mongoose?: any;
    sequelize?: any;
    acls?: {
      read?: acl.secureAny.Acls<ACLCheck>;
      update?: acl.secureAny.Acls<ACLCheck>;
      create?: acl.secureAny.Acls<ACLCheck>;
      remove?: acl.secureAny.Acls<ACLCheck>;
    };
    userGroup?: string;
    userGQL?;
    systemGQL?;
  }) {
    this.securityContext = acls && {
      user,
      group: userGroup,
      acls: {
        read: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.read,
              }
            : undefined,
        }),
        update: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.update,
              }
            : undefined,
        }),
        create: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultCreate,
                ...acls.create,
              }
            : undefined,
        }),
        remove: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.remove,
              }
            : undefined,
        }),
      },
    };
    this.mongoose = mongoose;
    this.sequelize = sequelize;
    this.initGQL({ userGQL, systemGQL });
  }

  async syncDb(force: boolean = false) {}

  async close() {
    if (this.sequelize && typeof this.sequelize.close === 'function') {
      await this.sequelize.close();
    }
    if (this.mongoose && typeof this.mongoose.close === 'function') {
      await this.mongoose.close();
    }
  }
}
