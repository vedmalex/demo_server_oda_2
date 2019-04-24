import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CourseFilterSubscriptions {
      or: [CourseFilterSubscriptions]
      and: [CourseFilterSubscriptions]
      mutation: WhereMutationKind
      node: CourseFilterSubscriptionsItem
      previous: CourseFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
