import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import { filter } from 'graphql-anywhere';
import { dataPump } from 'oda-api-graphql';
import { join as joinPath } from 'path';
require('isomorphic-fetch');
const storedQ = require('./../../data/seed-queries.json');

import loaderConfig from './loaderConfig';
import RegisterConnectors from '../model/connectors';
import { makeExecutableSchema } from 'graphql-tools';

import Schema from '../model/schema';

import { runQueryLodash } from 'oda-lodash';

let fn = process.argv[2]
  ? joinPath(process.cwd(), process.argv[2])
  : joinPath(__dirname, '../../data/dump.json');

import { dbPool } from '../model/dbPool';
import { SystemGraphQL, UserGQL } from '../model/runQuery';
import { pubsub } from '../model/pubsub';

async function createContext({ schema }) {
  let db = await dbPool.get('system');
  let connectors = new RegisterConnectors({
    mongoose: db,
  });
  const result = {
    connectors,
    systemConnectors: await SystemGraphQL.connectors(),
    systemGQL: SystemGraphQL.query,
    userGQL: undefined,
    db,
    // user: passport.systemUser(),
    // owner: passport.systemUser(),
    dbPool,
    pubsub,
  };

  const userGQL = new UserGQL({
    context: result,
    schema,
  });

  result.userGQL = userGQL.query.bind(userGQL);

  return result;
}

function prepareSchema() {
  let current = Schema.system;
  current.build();
  // current.applyHooks();
  return makeExecutableSchema({
    typeDefs: current.schema,
    resolvers: current.resolvers,
    resolverValidationOptions: {
      requireResolversForNonScalar: false,
    },
  });
}

const schema = prepareSchema();

// tslint:disable-next-line:no-var-requires
let data = require(fn);
createContext({ schema }).then(context => {
  dataPump
    .restoreDataDirect(
      loaderConfig.import.queries,
      storedQ,
      data,
      schema,
      context,
      runQueryLodash,
    )
    .then(() =>
      dataPump.restoreDataDirect(
        loaderConfig.import.relate,
        storedQ,
        data,
        schema,
        context,
        runQueryLodash,
      ),
    )
    .then(() => {
      context.db.close();
    })
    .catch(e => {
      console.error(e);
      context.db.close();
    });
});
