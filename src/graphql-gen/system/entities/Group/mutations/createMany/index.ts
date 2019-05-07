import { Schema } from '../../../../common';
import createManyGroup from './createManyGroup';
import createManyGroupInput from './createManyGroupInput';
import createManyGroupPayload from './createManyGroupPayload';

export default new Schema({
  name: 'Group.mutation.createMany',
  items: [createManyGroup, createManyGroupInput, createManyGroupPayload],
});
