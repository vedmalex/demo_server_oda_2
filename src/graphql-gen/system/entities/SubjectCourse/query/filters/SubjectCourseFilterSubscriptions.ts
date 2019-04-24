import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SubjectCourseFilterSubscriptions {
      or: [SubjectCourseFilterSubscriptions]
      and: [SubjectCourseFilterSubscriptions]
      mutation: WhereMutationKind
      node: SubjectCourseFilterSubscriptionsItem
      previous: SubjectCourseFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
