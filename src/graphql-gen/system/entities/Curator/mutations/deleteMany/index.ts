import { Schema } from '../../../../common';
import deleteManyCurator from './deleteManyCurator';
import deleteManyCuratorInput from './deleteManyCuratorInput';
import deleteManyCuratorPayload from './deleteManyCuratorPayload';

export default new Schema({
  name: 'Curator.mutation.deleteMany',
  items: [deleteManyCurator, deleteManyCuratorInput, deleteManyCuratorPayload],
});
