import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input GroupFilterSubscriptions {
      or: [GroupFilterSubscriptions]
      and: [GroupFilterSubscriptions]
      mutation: WhereMutationKind
      node: GroupFilterSubscriptionsItem
      previous: GroupFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
