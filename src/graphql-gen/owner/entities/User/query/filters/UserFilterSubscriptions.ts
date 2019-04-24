import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input UserFilterSubscriptions {
      or: [UserFilterSubscriptions]
      and: [UserFilterSubscriptions]
      mutation: WhereMutationKind
      node: UserFilterSubscriptionsItem
      previous: UserFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
