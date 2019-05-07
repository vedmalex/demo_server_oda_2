import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyCuratorInput {
      id: ID
      person: embedPersonInput
      personUnlink: embedPersonInput
      personCreate: createPersonInput
      groups: [embedGroupInput]
      groupsUnlink: [embedGroupInput]
      groupsCreate: [createGroupInput]
    }
  `,
});
