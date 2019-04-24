import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updatePersonInput {
      id: ID
      spiritualName: String
      fullName: String
      dateOfBirth: Date
      specialNotes: String
      user: embedUserInput
      userUnlink: embedUserInput
      userCreate: createUserInput
      socialNetworks: [embedSocialNetworkInput]
      socialNetworksUnlink: [embedSocialNetworkInput]
      socialNetworksCreate: [createSocialNetworkInput]
      phones: [embedPhoneInput]
      phonesUnlink: [embedPhoneInput]
      phonesCreate: [createPhoneInput]
      emails: [embedEmailInput]
      emailsUnlink: [embedEmailInput]
      emailsCreate: [createEmailInput]
      asStudents: [embedStudentInput]
      asStudentsUnlink: [embedStudentInput]
      asStudentsCreate: [createStudentInput]
      asCurator: embedCuratorInput
      asCuratorUnlink: embedCuratorInput
      asCuratorCreate: createCuratorInput
    }
  `,
});
