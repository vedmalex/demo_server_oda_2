import { acl, ACLCheck, SecurityContext } from 'oda-api-graphql';

import { RegisterConnectorsBase } from 'oda-api-graphql';

export default class RegisterConnectors extends RegisterConnectorsBase {
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
    super();
    this.securityContext = {
      user,
      group: userGroup,
      acls: {
        read: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.read,
              }
            : {
                '*': this._defaultAccess,
              },
        }),
        update: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.update,
              }
            : {
                '*': this._defaultAccess,
              },
        }),
        create: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultCreate,
                ...acls.create,
              }
            : {
                '*': this._defaultCreate,
              },
        }),
        remove: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.remove,
              }
            : {
                '*': this._defaultAccess,
              },
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
