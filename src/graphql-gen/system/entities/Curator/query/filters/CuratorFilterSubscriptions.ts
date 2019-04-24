import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CuratorFilterSubscriptions {
      or: [CuratorFilterSubscriptions]
      and: [CuratorFilterSubscriptions]
      mutation: WhereMutationKind
      node: CuratorFilterSubscriptionsItem
      previous: CuratorFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
