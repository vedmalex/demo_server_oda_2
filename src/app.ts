import { ApolloServer, makeExecutableSchema } from 'apollo-server';
import model from './model/schema'
const sys = model.system;
import RegisterConnectors from './model/connectors';
import { SystemGraphQL, UserGQL } from './model/runQuery';
import { dbPool } from './model/dbPool';
import { pubsub } from './model/pubsub';
import getLogger from 'oda-logger';
let logger = getLogger('app:server');

async function createContext(schema: object, resolvers: any) {
  let db = await dbPool.get('default');
  let systemConnectors = await SystemGraphQL.connectors();
  return ({ connection }) => {
    logger.trace('init context');
    let connectors = new RegisterConnectors({
      mongoose: db,
    });
    
    const result = {
      connectors,
      systemConnectors,
      systemGQL: SystemGraphQL.query,
      userGQL: undefined,
      db,
      dbPool,
      pubsub,
      schema,
      resolvers,
    };
    
    const userGQL = new UserGQL({
      context: result,
      schema,
    });
    result.userGQL = userGQL.query.bind(userGQL);
    
    if (connection) {
      return {...connection.context, ...result};
    } else {
      return result;
    }
  }
}

async function runServer() {

  sys.build();
  sys.applyHooks();
  
  const schema = makeExecutableSchema({
    typeDefs: sys.schema as any,
    resolvers: sys.resolvers as any
  });
  
  const server = new ApolloServer({
    schema,
    tracing: true,
    introspection: true,
    playground: true,
    context: await createContext( schema, sys.resolvers )
  });
  return server.listen();
}
// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
runServer()
.then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
});
