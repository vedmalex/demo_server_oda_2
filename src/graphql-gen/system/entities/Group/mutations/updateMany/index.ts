import { Schema } from '../../../../common';
import updateManyGroup from './updateManyGroup';
import updateManyGroupInput from './updateManyGroupInput';
import updateManyGroupPayload from './updateManyGroupPayload';

export default new Schema({
  name: 'Group.mutation.updateMany',
  items: [updateManyGroup, updateManyGroupInput, updateManyGroupPayload],
});
