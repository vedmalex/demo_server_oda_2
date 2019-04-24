import create from './create';
import _delete from './delete';
import update from './update';
import embedMeetingInput from './embedMeetingInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Meeting.mutations',
  items: [create, _delete, update, embedMeetingInput],
});
