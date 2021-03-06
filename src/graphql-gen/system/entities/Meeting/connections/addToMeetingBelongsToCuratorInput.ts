import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToMeetingBelongsToCuratorInput {
      meeting: ID!
      curator: ID!
      #additional Edge fields
    }
  `,
});
