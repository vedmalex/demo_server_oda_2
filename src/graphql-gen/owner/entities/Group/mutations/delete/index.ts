import { Schema } from '../../../../common';
import deleteGroup from './deleteGroup';
import deleteGroupInput from './deleteGroupInput';
import deleteGroupPayload from './deleteGroupPayload';

export default new Schema({
  name: 'Group.mutation.delete',
  items: [deleteGroup, deleteGroupInput, deleteGroupPayload],
});
