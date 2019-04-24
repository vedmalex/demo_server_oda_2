// tslint:disable:no-unused-variable
import * as dotenv from 'dotenv';
dotenv.config({ silent: true });
import * as fs from 'fs';
import * as path from 'path';
import { graphql, GraphQLSchema } from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
import { makeExecutableSchema } from 'graphql-tools';
import modelschema from './model/schema';

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  let current = modelschema.system;
  // current.build();
  const schema = makeExecutableSchema({
    typeDefs: current.schema,
    resolvers: current.resolvers,
    resolverValidationOptions: {
      requireResolversForNonScalar: false
    }
  });
  const result = await graphql(schema, introspectionQuery);
  if (result.errors) {
    console.error(
      // eslint-disable-line no-console
      'ERROR introspecting schema: ',
      JSON.stringify(result, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, '../data/schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
})();
