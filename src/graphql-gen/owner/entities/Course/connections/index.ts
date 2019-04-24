import { Schema } from '../../../common';

import addToCourseBelongsToManySubjects from './addToCourseBelongsToManySubjects';
import removeFromCourseBelongsToManySubjects from './removeFromCourseBelongsToManySubjects';
import addToCourseHasManyGroups from './addToCourseHasManyGroups';
import removeFromCourseHasManyGroups from './removeFromCourseHasManyGroups';
import addToCourseBelongsToManySubjectsInput from './addToCourseBelongsToManySubjectsInput';
import addToCourseBelongsToManySubjectsPayload from './addToCourseBelongsToManySubjectsPayload';
import removeFromCourseBelongsToManySubjectsInput from './removeFromCourseBelongsToManySubjectsInput';
import removeFromCourseBelongsToManySubjectsPayload from './removeFromCourseBelongsToManySubjectsPayload';
import addToCourseHasManyGroupsInput from './addToCourseHasManyGroupsInput';
import addToCourseHasManyGroupsPayload from './addToCourseHasManyGroupsPayload';
import removeFromCourseHasManyGroupsInput from './removeFromCourseHasManyGroupsInput';
import removeFromCourseHasManyGroupsPayload from './removeFromCourseHasManyGroupsPayload';

export default new Schema({
  name: 'Course.connections',
  items: [
    addToCourseBelongsToManySubjects,
    removeFromCourseBelongsToManySubjects,
    addToCourseHasManyGroups,
    removeFromCourseHasManyGroups,
    addToCourseBelongsToManySubjectsInput,
    addToCourseBelongsToManySubjectsPayload,
    removeFromCourseBelongsToManySubjectsInput,
    removeFromCourseBelongsToManySubjectsPayload,
    addToCourseHasManyGroupsInput,
    addToCourseHasManyGroupsPayload,
    removeFromCourseHasManyGroupsInput,
    removeFromCourseHasManyGroupsPayload,
  ],
});
