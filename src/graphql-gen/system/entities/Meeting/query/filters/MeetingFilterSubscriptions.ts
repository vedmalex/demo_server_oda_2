import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input MeetingFilterSubscriptions {
      or: [MeetingFilterSubscriptions]
      and: [MeetingFilterSubscriptions]
      mutation: WhereMutationKind
      node: MeetingFilterSubscriptionsItem
      previous: MeetingFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
