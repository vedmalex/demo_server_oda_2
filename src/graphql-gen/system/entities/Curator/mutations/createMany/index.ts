import { Schema } from '../../../../common';
import createManyCurator from './createManyCurator';
import createManyCuratorInput from './createManyCuratorInput';
import createManyCuratorPayload from './createManyCuratorPayload';

export default new Schema({
  name: 'Curator.mutation.createMany',
  items: [createManyCurator, createManyCuratorInput, createManyCuratorPayload],
});
