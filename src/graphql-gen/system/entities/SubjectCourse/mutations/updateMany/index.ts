import { Schema } from '../../../../common';
import updateManySubjectCourse from './updateManySubjectCourse';
import updateManySubjectCourseInput from './updateManySubjectCourseInput';
import updateManySubjectCoursePayload from './updateManySubjectCoursePayload';

export default new Schema({
  name: 'SubjectCourse.mutation.updateMany',
  items: [
    updateManySubjectCourse,
    updateManySubjectCourseInput,
    updateManySubjectCoursePayload,
  ],
});
