import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input StudentFilterSubscriptions {
      or: [StudentFilterSubscriptions]
      and: [StudentFilterSubscriptions]
      mutation: WhereMutationKind
      node: StudentFilterSubscriptionsItem
      previous: StudentFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
