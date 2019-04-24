import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union EmailSubscriptionPayload =
        UpdateEmailSubscriptionPayload
      | EmailBelongsToPersonSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.email || obj.type) {
        return 'UpdateEmailSubscriptionPayload';
      }
      if (obj.args && obj.args.email && obj.args.person) {
        return 'EmailBelongsToPersonSubscriptionPayload';
      }
      return null;
    },
  },
});
