import Entities from './entities';
import Types from './_Types';
import Scalars from './scalars';
import Directives from './directives';
import Enums from './enums';
import Unions from './unions';
import Mixins from './mixins';
import Queries from './queries';
import Mutations from './mutations';
import { Schema } from 'oda-gen-common';
import gql from 'graphql-tag';

export {
  Types,
  Entities,
  Directives,
  Scalars,
  Enums,
  Mixins,
  Unions,
  Queries,
  Mutations,
};

export default new Schema({
  name: 'Owner',
  schema: gql`
    schema {
      query: Query
      mutation: Mutation
      subscription: Subscription
    }
  `,
  items: [
    Types,
    Entities,
    Directives,
    Scalars,
    Enums,
    Mixins,
    Unions,
    Queries,
    Mutations,
  ],
});
