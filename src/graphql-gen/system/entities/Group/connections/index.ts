import { Schema } from '../../../common';

import addToGroupBelongsToCourse from './addToGroupBelongsToCourse';
import removeFromGroupBelongsToCourse from './removeFromGroupBelongsToCourse';
import addToGroupHasManyStudents from './addToGroupHasManyStudents';
import removeFromGroupHasManyStudents from './removeFromGroupHasManyStudents';
import addToGroupBelongsToCurator from './addToGroupBelongsToCurator';
import removeFromGroupBelongsToCurator from './removeFromGroupBelongsToCurator';
import addToGroupBelongsToCourseInput from './addToGroupBelongsToCourseInput';
import addToGroupBelongsToCoursePayload from './addToGroupBelongsToCoursePayload';
import removeFromGroupBelongsToCourseInput from './removeFromGroupBelongsToCourseInput';
import removeFromGroupBelongsToCoursePayload from './removeFromGroupBelongsToCoursePayload';
import addToGroupHasManyStudentsInput from './addToGroupHasManyStudentsInput';
import addToGroupHasManyStudentsPayload from './addToGroupHasManyStudentsPayload';
import removeFromGroupHasManyStudentsInput from './removeFromGroupHasManyStudentsInput';
import removeFromGroupHasManyStudentsPayload from './removeFromGroupHasManyStudentsPayload';
import addToGroupBelongsToCuratorInput from './addToGroupBelongsToCuratorInput';
import addToGroupBelongsToCuratorPayload from './addToGroupBelongsToCuratorPayload';
import removeFromGroupBelongsToCuratorInput from './removeFromGroupBelongsToCuratorInput';
import removeFromGroupBelongsToCuratorPayload from './removeFromGroupBelongsToCuratorPayload';

export default new Schema({
  name: 'Group.connections',
  items: [
    addToGroupBelongsToCourse,
    removeFromGroupBelongsToCourse,
    addToGroupHasManyStudents,
    removeFromGroupHasManyStudents,
    addToGroupBelongsToCurator,
    removeFromGroupBelongsToCurator,
    addToGroupBelongsToCourseInput,
    addToGroupBelongsToCoursePayload,
    removeFromGroupBelongsToCourseInput,
    removeFromGroupBelongsToCoursePayload,
    addToGroupHasManyStudentsInput,
    addToGroupHasManyStudentsPayload,
    removeFromGroupHasManyStudentsInput,
    removeFromGroupHasManyStudentsPayload,
    addToGroupBelongsToCuratorInput,
    addToGroupBelongsToCuratorPayload,
    removeFromGroupBelongsToCuratorInput,
    removeFromGroupBelongsToCuratorPayload,
  ],
});
