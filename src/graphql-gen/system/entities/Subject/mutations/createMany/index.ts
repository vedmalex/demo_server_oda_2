import { Schema } from '../../../../common';
import createManySubject from './createManySubject';
import createManySubjectInput from './createManySubjectInput';
import createManySubjectPayload from './createManySubjectPayload';

import embedCourseCreateIntoSubjectCourseInput from './embedCourseCreateIntoSubjectCourseInput';

export default new Schema({
  name: 'Subject.mutation.createMany',
  items: [
    embedCourseCreateIntoSubjectCourseInput,
    createManySubject,
    createManySubjectInput,
    createManySubjectPayload,
  ],
});
