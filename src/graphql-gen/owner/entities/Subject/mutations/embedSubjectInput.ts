import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedSubjectInput {
      id: ID
      name: String
      course: [embedCourseUpdateIntoSubjectCourseInput]
    }
  `,
});
