import { Schema } from '../../../../common';
import updateManySubject from './updateManySubject';
import updateManySubjectInput from './updateManySubjectInput';
import updateManySubjectPayload from './updateManySubjectPayload';

import embedCourseUpdateIntoSubjectCourseInput from './embedCourseUpdateIntoSubjectCourseInput';

export default new Schema({
  name: 'Subject.mutation.updateMany',
  items: [
    embedCourseUpdateIntoSubjectCourseInput,
    updateManySubject,
    updateManySubjectInput,
    updateManySubjectPayload,
  ],
});
