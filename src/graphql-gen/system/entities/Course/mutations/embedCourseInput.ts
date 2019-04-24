import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedCourseInput {
      id: ID
      name: String
      subjects: [embedSubjectInput]
      groups: [embedGroupInput]
    }
  `,
});
