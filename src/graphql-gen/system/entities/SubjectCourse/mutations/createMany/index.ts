import { Schema } from '../../../../common';
import createManySubjectCourse from './createManySubjectCourse';
import createManySubjectCourseInput from './createManySubjectCourseInput';
import createManySubjectCoursePayload from './createManySubjectCoursePayload';

export default new Schema({
  name: 'SubjectCourse.mutation.createMany',
  items: [
    createManySubjectCourse,
    createManySubjectCourseInput,
    createManySubjectCoursePayload,
  ],
});
