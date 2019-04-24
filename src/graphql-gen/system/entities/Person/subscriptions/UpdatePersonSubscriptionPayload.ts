import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdatePersonSubscriptionPayload {
      id: ID
      createdAt: Date
      updatedAt: Date
      removed: Boolean
      owner: String
    }
  `,
});
