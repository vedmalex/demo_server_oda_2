import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type MeetingBelongsToManyStudentsEdge {
      node: Student
      cursor: String!
      #additional Edge fields

      # # Present
      present: Boolean
      # # Special Notes
      specialNotes: String
      # # Superpuper
      superpuper: String
      # put here your additiona edge fields
    }
  `,
});
