import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createManySubjectInput {
      id: ID
      name: String!
      course: [embedCourseCreateIntoSubjectCourseInput]
    }
  `,
});
