import { Schema } from '../../../common';

import addToStudentBelongsToPerson from './addToStudentBelongsToPerson';
import removeFromStudentBelongsToPerson from './removeFromStudentBelongsToPerson';
import addToStudentBelongsToGroup from './addToStudentBelongsToGroup';
import removeFromStudentBelongsToGroup from './removeFromStudentBelongsToGroup';
import addToStudentBelongsToManyMeetings from './addToStudentBelongsToManyMeetings';
import removeFromStudentBelongsToManyMeetings from './removeFromStudentBelongsToManyMeetings';
import addToStudentBelongsToPersonInput from './addToStudentBelongsToPersonInput';
import addToStudentBelongsToPersonPayload from './addToStudentBelongsToPersonPayload';
import removeFromStudentBelongsToPersonInput from './removeFromStudentBelongsToPersonInput';
import removeFromStudentBelongsToPersonPayload from './removeFromStudentBelongsToPersonPayload';
import addToStudentBelongsToGroupInput from './addToStudentBelongsToGroupInput';
import addToStudentBelongsToGroupPayload from './addToStudentBelongsToGroupPayload';
import removeFromStudentBelongsToGroupInput from './removeFromStudentBelongsToGroupInput';
import removeFromStudentBelongsToGroupPayload from './removeFromStudentBelongsToGroupPayload';
import addToStudentBelongsToManyMeetingsInput from './addToStudentBelongsToManyMeetingsInput';
import addToStudentBelongsToManyMeetingsPayload from './addToStudentBelongsToManyMeetingsPayload';
import removeFromStudentBelongsToManyMeetingsInput from './removeFromStudentBelongsToManyMeetingsInput';
import removeFromStudentBelongsToManyMeetingsPayload from './removeFromStudentBelongsToManyMeetingsPayload';

export default new Schema({
  name: 'Student.connections',
  items: [
    addToStudentBelongsToPerson,
    removeFromStudentBelongsToPerson,
    addToStudentBelongsToGroup,
    removeFromStudentBelongsToGroup,
    addToStudentBelongsToManyMeetings,
    removeFromStudentBelongsToManyMeetings,
    addToStudentBelongsToPersonInput,
    addToStudentBelongsToPersonPayload,
    removeFromStudentBelongsToPersonInput,
    removeFromStudentBelongsToPersonPayload,
    addToStudentBelongsToGroupInput,
    addToStudentBelongsToGroupPayload,
    removeFromStudentBelongsToGroupInput,
    removeFromStudentBelongsToGroupPayload,
    addToStudentBelongsToManyMeetingsInput,
    addToStudentBelongsToManyMeetingsPayload,
    removeFromStudentBelongsToManyMeetingsInput,
    removeFromStudentBelongsToManyMeetingsPayload,
  ],
});
