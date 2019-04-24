import { ApolloServer } from 'apollo-server';
import schema from './model/schema'
const sys = schema.owner;

debugger;
sys.build();

const server = new ApolloServer({
  typeDefs: sys.schema as any,
  resolvers: sys.resolvers as any,
  tracing: true,
  introspection: true,
  playground: true,
});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
