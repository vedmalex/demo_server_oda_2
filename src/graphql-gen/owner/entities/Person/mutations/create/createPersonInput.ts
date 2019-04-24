import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createPersonInput {
      id: ID
      spiritualName: String!
      fullName: String!
      dateOfBirth: Date
      specialNotes: String
      user: embedUserInput
      socialNetworks: [embedSocialNetworkInput]
      phones: [embedPhoneInput]
      emails: [embedEmailInput]
      asStudents: [embedStudentInput]
      asCurator: embedCuratorInput
    }
  `,
});
