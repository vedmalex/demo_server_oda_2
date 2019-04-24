import meeting from './meeting';
import meetingUniqueKeys from './meetingUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Meeting.queries.single',
  items: [meeting, meetingUniqueKeys],
});
