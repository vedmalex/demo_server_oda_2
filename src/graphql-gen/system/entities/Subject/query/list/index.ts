import SubjectsEdge from './SubjectsEdge';
import SubjectsConnection from './SubjectsConnection';
import SubjectBelongsToManyCoursesConnection from './SubjectBelongsToManyCoursesConnection';
import SubjectBelongsToManyCoursesEdge from './SubjectBelongsToManyCoursesEdge';
import subjectItems from './subjectItems';
import subjects from './subjects';
import SubjectSortOrder from './SubjectSortOrder';
import SubjectComplexFilter from './SubjectComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Subject.queries.list',
  items: [
    SubjectsEdge,
    SubjectsConnection,
    SubjectBelongsToManyCoursesConnection,
    SubjectBelongsToManyCoursesEdge,
    subjectItems,
    subjects,
    SubjectSortOrder,
    SubjectComplexFilter,
  ],
});
