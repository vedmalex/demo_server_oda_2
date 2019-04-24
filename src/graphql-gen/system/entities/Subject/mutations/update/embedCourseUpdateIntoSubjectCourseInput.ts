import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedCourseUpdateIntoSubjectCourseInput {
      id: ID
      name: String
      createdAt: Date
      updatedAt: Date
      removed: Boolean
      owner: String
      hours: Float
      level: String
      subjects: [embedSubjectInput]
      groups: [embedGroupInput]
      createdBy: embedUserInput
      updateBy: embedUserInput
    }
  `,
});
