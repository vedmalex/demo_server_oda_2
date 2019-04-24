import { Schema } from '../../../../common';
import updateCurator from './updateCurator';
import updateCuratorInput from './updateCuratorInput';
import updateCuratorPayload from './updateCuratorPayload';

export default new Schema({
  name: 'Curator.mutation.update',
  items: [updateCurator, updateCuratorInput, updateCuratorPayload],
});
