import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input PersonFilterSubscriptions {
      or: [PersonFilterSubscriptions]
      and: [PersonFilterSubscriptions]
      mutation: WhereMutationKind
      node: PersonFilterSubscriptionsItem
      previous: PersonFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
