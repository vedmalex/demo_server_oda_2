import { Schema } from '../../../../common';
import updateManyCurator from './updateManyCurator';
import updateManyCuratorInput from './updateManyCuratorInput';
import updateManyCuratorPayload from './updateManyCuratorPayload';

export default new Schema({
  name: 'Curator.mutation.updateMany',
  items: [updateManyCurator, updateManyCuratorInput, updateManyCuratorPayload],
});
