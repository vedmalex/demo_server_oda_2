import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedGroupInput {
      id: ID
      name: String
      course: embedCourseInput
      students: [embedStudentInput]
      curator: embedCuratorInput
    }
  `,
});
