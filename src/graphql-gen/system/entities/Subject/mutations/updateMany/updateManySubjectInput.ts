import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManySubjectInput {
      id: ID
      name: String
      course: [embedCourseUpdateIntoSubjectCourseInput]
      courseUnlink: [embedCourseUpdateIntoSubjectCourseInput]
      courseCreate: [embedCourseCreateIntoSubjectCourseInput]
    }
  `,
});
