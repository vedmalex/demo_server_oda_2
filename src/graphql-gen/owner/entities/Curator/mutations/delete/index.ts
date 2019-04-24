import { Schema } from '../../../../common';
import deleteCurator from './deleteCurator';
import deleteCuratorInput from './deleteCuratorInput';
import deleteCuratorPayload from './deleteCuratorPayload';

export default new Schema({
  name: 'Curator.mutation.delete',
  items: [deleteCurator, deleteCuratorInput, deleteCuratorPayload],
});
