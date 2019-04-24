import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union PersonSubscriptionPayload =
        UpdatePersonSubscriptionPayload
      | PersonBelongsToUserSubscriptionPayload
      | PersonHasManySocialNetworksSubscriptionPayload
      | PersonHasManyPhonesSubscriptionPayload
      | PersonHasManyEmailsSubscriptionPayload
      | PersonHasManyAsStudentsSubscriptionPayload
      | PersonHasOneAsCuratorSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.spiritualName ||
        obj.fullName ||
        obj.dateOfBirth ||
        obj.specialNotes
      ) {
        return 'UpdatePersonSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.user) {
        return 'PersonBelongsToUserSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.socialNetwork) {
        return 'PersonHasManySocialNetworksSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.phone) {
        return 'PersonHasManyPhonesSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.email) {
        return 'PersonHasManyEmailsSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.student) {
        return 'PersonHasManyAsStudentsSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.curator) {
        return 'PersonHasOneAsCuratorSubscriptionPayload';
      }
      return null;
    },
  },
});
