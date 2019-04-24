import connections from './connections';
import * as helpers from './helpers';
import mutations from './mutations';
import query from './query';
import subscriptions from './subscriptions';
import type from './type';
import { Schema } from 'oda-gen-common';

export { connections, mutations, query, subscriptions, type, helpers };

export default new Schema({
  name: 'Phone',
  items: [connections, mutations, query, subscriptions, type],
});
