import { Schema } from '../../../../common';
import deleteManySubjectCourse from './deleteManySubjectCourse';
import deleteManySubjectCourseInput from './deleteManySubjectCourseInput';
import deleteManySubjectCoursePayload from './deleteManySubjectCoursePayload';

export default new Schema({
  name: 'SubjectCourse.mutation.deleteMany',
  items: [
    deleteManySubjectCourse,
    deleteManySubjectCourseInput,
    deleteManySubjectCoursePayload,
  ],
});
