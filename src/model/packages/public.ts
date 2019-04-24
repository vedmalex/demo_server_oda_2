// tslint:disable:no-unused-variable
import { common } from 'oda-gen-graphql';
import PublicGenerated from './../../graphql-gen/public';

import CommonExtends from '../common';
import Overrides from '../override';

import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';
import { Schema } from 'oda-gen-common';
import gql from 'graphql-tag';

export default new Schema({
  name: 'system.schema',
  items: [PublicGenerated, CommonExtends, Overrides],
  schema: gql`
    schema {
      query: RootQuery
      mutation: RootMutation
      subscription: RootSubscription
    }
  `,
});
