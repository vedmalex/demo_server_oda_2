import { Schema } from '../../../../common';
import createCurator from './createCurator';
import createCuratorInput from './createCuratorInput';
import createCuratorPayload from './createCuratorPayload';

export default new Schema({
  name: 'Curator.mutation.create',
  items: [createCurator, createCuratorInput, createCuratorPayload],
});
