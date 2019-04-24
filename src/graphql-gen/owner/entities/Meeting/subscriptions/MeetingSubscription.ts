import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type MeetingSubscription {
      mutation: MutationKind!
      node: Meeting!
      payload: MeetingSubscriptionPayload
      updatedFields: [String]
      previous: UpdateMeetingSubscriptionPayload
    }
  `,
});
