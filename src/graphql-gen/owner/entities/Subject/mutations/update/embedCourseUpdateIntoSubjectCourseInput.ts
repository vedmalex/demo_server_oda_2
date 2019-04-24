import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedCourseUpdateIntoSubjectCourseInput {
      id: ID
      name: String
      hours: Float
      level: String
      subjects: [embedSubjectInput]
      groups: [embedGroupInput]
    }
  `,
});
