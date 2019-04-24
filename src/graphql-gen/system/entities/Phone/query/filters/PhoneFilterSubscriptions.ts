import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input PhoneFilterSubscriptions {
      or: [PhoneFilterSubscriptions]
      and: [PhoneFilterSubscriptions]
      mutation: WhereMutationKind
      node: PhoneFilterSubscriptionsItem
      previous: PhoneFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
