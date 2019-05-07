import { Schema } from '../../../../common';
import deleteManyGroup from './deleteManyGroup';
import deleteManyGroupInput from './deleteManyGroupInput';
import deleteManyGroupPayload from './deleteManyGroupPayload';

export default new Schema({
  name: 'Group.mutation.deleteMany',
  items: [deleteManyGroup, deleteManyGroupInput, deleteManyGroupPayload],
});
