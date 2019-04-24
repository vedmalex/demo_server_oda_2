import { Schema } from '../../../../common';
import updateSubject from './updateSubject';
import updateSubjectInput from './updateSubjectInput';
import updateSubjectPayload from './updateSubjectPayload';

import embedCourseUpdateIntoSubjectCourseInput from './embedCourseUpdateIntoSubjectCourseInput';

export default new Schema({
  name: 'Subject.mutation.update',
  items: [
    embedCourseUpdateIntoSubjectCourseInput,
    updateSubject,
    updateSubjectInput,
    updateSubjectPayload,
  ],
});
