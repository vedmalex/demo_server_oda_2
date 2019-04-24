import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromSubjectCourseBelongsToCourseLinkInput {
      course: ID!
      subjectCourse: ID!
    }
  `,
});
