import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyStudentInput {
      id: ID
      person: embedPersonInput
      personUnlink: embedPersonInput
      personCreate: createPersonInput
      group: embedGroupInput
      groupUnlink: embedGroupInput
      groupCreate: createGroupInput
      meetings: [embedMeetingInput]
      meetingsUnlink: [embedMeetingInput]
      meetingsCreate: [createMeetingInput]
    }
  `,
});
