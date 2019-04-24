import { common } from 'oda-gen-graphql';
import OwnerGenerated from './../../graphql-gen/owner';

import CommonExtends from '../common';
import Overrides from '../override';

import { pubsub } from '../pubsub';
import { withFilter } from 'graphql-subscriptions';
import { Schema } from 'oda-gen-common';
import gql from 'graphql-tag';
debugger;
export default new Schema({
  name: 'system.schema',
  items: [OwnerGenerated, CommonExtends, Overrides],
  schema: gql`
    schema {
      query: RootQuery
      mutation: RootMutation
      subscription: RootSubscription
    }
  `,
});
