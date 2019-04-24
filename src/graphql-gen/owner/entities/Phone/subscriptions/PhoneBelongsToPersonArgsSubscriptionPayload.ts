import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type PhoneBelongsToPersonArgsSubscriptionPayload {
      phone: ID!
      person: ID!
    }
  `,
});
