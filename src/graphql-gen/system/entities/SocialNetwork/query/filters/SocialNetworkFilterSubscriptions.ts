import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SocialNetworkFilterSubscriptions {
      or: [SocialNetworkFilterSubscriptions]
      and: [SocialNetworkFilterSubscriptions]
      mutation: WhereMutationKind
      node: SocialNetworkFilterSubscriptionsItem
      previous: SocialNetworkFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
