import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToMeetingBelongsToGroupInput {
      meeting: ID!
      group: ID!
      #additional Edge fields
    }
  `,
});
