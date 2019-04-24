import { Schema } from '../../../common';

import addToMeetingBelongsToCurator from './addToMeetingBelongsToCurator';
import removeFromMeetingBelongsToCurator from './removeFromMeetingBelongsToCurator';
import addToMeetingBelongsToGroup from './addToMeetingBelongsToGroup';
import removeFromMeetingBelongsToGroup from './removeFromMeetingBelongsToGroup';
import addToMeetingBelongsToManyStudents from './addToMeetingBelongsToManyStudents';
import removeFromMeetingBelongsToManyStudents from './removeFromMeetingBelongsToManyStudents';
import addToMeetingBelongsToCuratorInput from './addToMeetingBelongsToCuratorInput';
import addToMeetingBelongsToCuratorPayload from './addToMeetingBelongsToCuratorPayload';
import removeFromMeetingBelongsToCuratorInput from './removeFromMeetingBelongsToCuratorInput';
import removeFromMeetingBelongsToCuratorPayload from './removeFromMeetingBelongsToCuratorPayload';
import addToMeetingBelongsToGroupInput from './addToMeetingBelongsToGroupInput';
import addToMeetingBelongsToGroupPayload from './addToMeetingBelongsToGroupPayload';
import removeFromMeetingBelongsToGroupInput from './removeFromMeetingBelongsToGroupInput';
import removeFromMeetingBelongsToGroupPayload from './removeFromMeetingBelongsToGroupPayload';
import addToMeetingBelongsToManyStudentsInput from './addToMeetingBelongsToManyStudentsInput';
import addToMeetingBelongsToManyStudentsPayload from './addToMeetingBelongsToManyStudentsPayload';
import removeFromMeetingBelongsToManyStudentsInput from './removeFromMeetingBelongsToManyStudentsInput';
import removeFromMeetingBelongsToManyStudentsPayload from './removeFromMeetingBelongsToManyStudentsPayload';

export default new Schema({
  name: 'Meeting.connections',
  items: [
    addToMeetingBelongsToCurator,
    removeFromMeetingBelongsToCurator,
    addToMeetingBelongsToGroup,
    removeFromMeetingBelongsToGroup,
    addToMeetingBelongsToManyStudents,
    removeFromMeetingBelongsToManyStudents,
    addToMeetingBelongsToCuratorInput,
    addToMeetingBelongsToCuratorPayload,
    removeFromMeetingBelongsToCuratorInput,
    removeFromMeetingBelongsToCuratorPayload,
    addToMeetingBelongsToGroupInput,
    addToMeetingBelongsToGroupPayload,
    removeFromMeetingBelongsToGroupInput,
    removeFromMeetingBelongsToGroupPayload,
    addToMeetingBelongsToManyStudentsInput,
    addToMeetingBelongsToManyStudentsPayload,
    removeFromMeetingBelongsToManyStudentsInput,
    removeFromMeetingBelongsToManyStudentsPayload,
  ],
});
