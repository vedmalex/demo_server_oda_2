import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type PhoneBelongsToCreatedByArgsSubscriptionPayload {
      phone: ID!
      user: ID!
    }
  `,
});
