import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateGroupSubscriptionPayload {
      id: ID
      name: String
    }
  `,
});
