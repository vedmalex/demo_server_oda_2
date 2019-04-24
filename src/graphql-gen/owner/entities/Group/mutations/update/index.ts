import { Schema } from '../../../../common';
import updateGroup from './updateGroup';
import updateGroupInput from './updateGroupInput';
import updateGroupPayload from './updateGroupPayload';

export default new Schema({
  name: 'Group.mutation.update',
  items: [updateGroup, updateGroupInput, updateGroupPayload],
});
