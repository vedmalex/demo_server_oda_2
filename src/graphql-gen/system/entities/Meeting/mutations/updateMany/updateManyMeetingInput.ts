import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyMeetingInput {
      id: ID
      date: Date
      curator: embedCuratorInput
      curatorUnlink: embedCuratorInput
      curatorCreate: createCuratorInput
      group: embedGroupInput
      groupUnlink: embedGroupInput
      groupCreate: createGroupInput
      students: [embedStudentUpdateIntoMeetingStudentsInput]
      studentsUnlink: [embedStudentUpdateIntoMeetingStudentsInput]
      studentsCreate: [embedStudentCreateIntoMeetingStudentsInput]
    }
  `,
});
