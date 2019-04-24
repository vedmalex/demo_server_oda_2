import { Schema } from '../../../common';

import addToSubjectBelongsToManyCourses from './addToSubjectBelongsToManyCourses';
import removeFromSubjectBelongsToManyCourses from './removeFromSubjectBelongsToManyCourses';
import addToSubjectBelongsToManyCoursesInput from './addToSubjectBelongsToManyCoursesInput';
import addToSubjectBelongsToManyCoursesPayload from './addToSubjectBelongsToManyCoursesPayload';
import removeFromSubjectBelongsToManyCoursesInput from './removeFromSubjectBelongsToManyCoursesInput';
import removeFromSubjectBelongsToManyCoursesPayload from './removeFromSubjectBelongsToManyCoursesPayload';

export default new Schema({
  name: 'Subject.connections',
  items: [
    addToSubjectBelongsToManyCourses,
    removeFromSubjectBelongsToManyCourses,
    addToSubjectBelongsToManyCoursesInput,
    addToSubjectBelongsToManyCoursesPayload,
    removeFromSubjectBelongsToManyCoursesInput,
    removeFromSubjectBelongsToManyCoursesPayload,
  ],
});
