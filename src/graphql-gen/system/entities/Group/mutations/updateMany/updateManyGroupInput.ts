import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyGroupInput {
      id: ID
      name: String
      course: embedCourseInput
      courseUnlink: embedCourseInput
      courseCreate: createCourseInput
      students: [embedStudentInput]
      studentsUnlink: [embedStudentInput]
      studentsCreate: [createStudentInput]
      curator: embedCuratorInput
      curatorUnlink: embedCuratorInput
      curatorCreate: createCuratorInput
    }
  `,
});
