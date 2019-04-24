import create from './create';
import _delete from './delete';
import update from './update';
import embedSubjectInput from './embedSubjectInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Subject.mutations',
  items: [create, _delete, update, embedSubjectInput],
});
