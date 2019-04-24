import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdatePersonSubscriptionPayload {
      id: ID
      spiritualName: String
      fullName: String
      dateOfBirth: Date
      specialNotes: String
    }
  `,
});
