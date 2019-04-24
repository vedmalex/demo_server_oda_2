import { validate } from 'graphql/validation';
const storedQ = require('./../../data/seed-queries.json');
import { makeExecutableSchema } from 'graphql-tools';
import Schema from '../model/schema';

function prepareSchema() {
  let current = Schema.system;
  current.build();
  return makeExecutableSchema({
    typeDefs: current.schema,
    resolvers: current.resolvers,
    resolverValidationOptions: {
      requireResolversForNonScalar: false,
    },
  });
}
debugger;
const schema = prepareSchema();
for (let ast in storedQ) {
  if (/fragments.graphql$/.test(ast)) {
    continue;
  }
  let errors = validate(schema, storedQ[ast]);
  if (errors.length > 0) {
    console.log(`->${ast}`);
    errors.map(e => e.message).forEach(console.log);
  }
}
