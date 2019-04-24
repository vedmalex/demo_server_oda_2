import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SubjectFilterSubscriptions {
      or: [SubjectFilterSubscriptions]
      and: [SubjectFilterSubscriptions]
      mutation: WhereMutationKind
      node: SubjectFilterSubscriptionsItem
      previous: SubjectFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
