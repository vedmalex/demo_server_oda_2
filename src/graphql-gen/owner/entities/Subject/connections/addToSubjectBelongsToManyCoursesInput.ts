import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToSubjectBelongsToManyCoursesInput {
      subject: ID!
      course: ID!
      #additional Edge fields
      hours: Float
      level: String
    }
  `,
});
