import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToSubjectCourseBelongsToSubjectLinkInput {
      subjectCourse: ID!
      subject: ID!
      #additional Edge fields
    }
  `,
});
