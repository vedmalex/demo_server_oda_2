import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateMeetingInput {
      id: ID
      createdAt: Date
      updatedAt: Date
      removed: Boolean
      owner: String
      createdBy: embedUserInput
      createdByUnlink: embedUserInput
      createdByCreate: createUserInput
      updateBy: embedUserInput
      updateByUnlink: embedUserInput
      updateByCreate: createUserInput
    }
  `,
});
