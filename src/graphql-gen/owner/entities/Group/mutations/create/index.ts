import { Schema } from '../../../../common';
import createGroup from './createGroup';
import createGroupInput from './createGroupInput';
import createGroupPayload from './createGroupPayload';

export default new Schema({
  name: 'Group.mutation.create',
  items: [createGroup, createGroupInput, createGroupPayload],
});
