import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as config from 'config';
import RegisterConnectors from './connectors';
import { passport } from 'oda-api-common';
import { makeExecutableSchema } from 'graphql-tools';
import schema from '../model/schema';
import { ExecutionResult } from 'graphql';
import { runQueryLodash } from 'oda-lodash';
import { dbPool } from './dbPool';
import { parse } from 'graphql';

let schemas = () => schema.system;

export class UserGQL {
  private context: any;
  private schema: any;

  constructor({ context, schema }) {
    this.context = context;
    this.schema = schema;
  }

  public async query({
    query,
    variables
  }: {
    query: string;
    variables: any;
  }): Promise<ExecutionResult> {
    return await runQueryLodash({
      document: typeof query ==='string' ? parse(query): query,
      variableValues: variables,
      schema: this.schema,
      contextValue: this.context
    });
  }
}

export class SystemGraphQL {
  private static _schemas;
  private static _schema;
  private static schema = () => {
    if (!SystemGraphQL._schemas) {
      SystemGraphQL._schemas = schemas();
    }
    if (!SystemGraphQL._schema) {
      SystemGraphQL._schemas.build();
      SystemGraphQL._schema = makeExecutableSchema({
        typeDefs: SystemGraphQL._schemas.schema,
        resolvers: SystemGraphQL._schemas.resolvers,
        resolverValidationOptions: {
          requireResolversForNonScalar: false
        }
      });
    }
    return SystemGraphQL._schema;
  };

  public static async connectors() {
    return new RegisterConnectors({
      mongoose: await dbPool.get('system'),
      user: passport.systemUser(),
      owner: passport.systemUser()
    });
  }

  public static async close() {}

  public static async query({
    query,
    variables,
    context,
    schema
  }: {
    query: string;
    variables: any;
    context?: any;
    schema?: any;
  }): Promise<ExecutionResult> {
    return await runQueryLodash({
      document: typeof query ==='string' ? parse(query): query,
      variableValues: variables,
      schema: schema || SystemGraphQL.schema(),
      contextValue: context || (await SystemGraphQL.context())
    });
  }

  private static async context() {
    return {
      connectors: await SystemGraphQL.connectors(),
      db: await dbPool.get('system'),
      user: passport.systemUser(),
      owner: passport.systemUser(),
      systemConnectors: await SystemGraphQL.connectors(),
      systemGQL: SystemGraphQL.query,
      userGQL: SystemGraphQL.query
    };
  }
}


// npm link oda-api-common oda-api-graphql oda-api-graphql-mongoose oda-gen-common oda-gen-graphql oda-isomorfic oda-lodash oda-model