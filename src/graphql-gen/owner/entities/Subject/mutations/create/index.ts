import { Schema } from '../../../../common';
import createSubject from './createSubject';
import createSubjectInput from './createSubjectInput';
import createSubjectPayload from './createSubjectPayload';

import embedCourseCreateIntoSubjectCourseInput from './embedCourseCreateIntoSubjectCourseInput';

export default new Schema({
  name: 'Subject.mutation.create',
  items: [
    embedCourseCreateIntoSubjectCourseInput,
    createSubject,
    createSubjectInput,
    createSubjectPayload,
  ],
});
