import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToMeetingBelongsToManyStudentsInput {
      meeting: ID!
      student: ID!
      #additional Edge fields
      present: Boolean
      specialNotes: String
      superpuper: String
    }
  `,
});
