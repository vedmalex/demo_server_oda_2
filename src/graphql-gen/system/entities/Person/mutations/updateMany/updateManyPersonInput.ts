import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyPersonInput {
      id: ID
      spiritualName: String
      fullName: String
      dateOfBirth: Date
      specialNotes: String
      user: embedUserInput
      userUnlink: embedUserInput
      userCreate: createUserInput
      socialNetworks: [embedSocialNetworkInput]
      phones: [embedPhoneInput]
      emails: [embedEmailInput]
      asStudents: [embedStudentInput]
      asStudentsUnlink: [embedStudentInput]
      asStudentsCreate: [createStudentInput]
      asCurator: embedCuratorInput
      asCuratorUnlink: embedCuratorInput
      asCuratorCreate: createCuratorInput
    }
  `,
});
