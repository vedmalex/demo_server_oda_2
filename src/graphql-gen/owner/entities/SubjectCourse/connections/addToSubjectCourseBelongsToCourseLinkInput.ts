import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToSubjectCourseBelongsToCourseLinkInput {
      subjectCourse: ID!
      course: ID!
      #additional Edge fields
    }
  `,
});
