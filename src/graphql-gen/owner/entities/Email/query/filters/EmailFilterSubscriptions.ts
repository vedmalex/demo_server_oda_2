import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmailFilterSubscriptions {
      or: [EmailFilterSubscriptions]
      and: [EmailFilterSubscriptions]
      mutation: WhereMutationKind
      node: EmailFilterSubscriptionsItem
      previous: EmailFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
