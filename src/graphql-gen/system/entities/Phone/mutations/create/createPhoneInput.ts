import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createPhoneInput {
      id: ID
      createdAt: Date
      updatedAt: Date
      removed: Boolean
      owner: String
      createdBy: embedUserInput
      updateBy: embedUserInput
    }
  `,
});
