import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyCourseInput {
      id: ID
      name: String
      subjects: [embedSubjectInput]
      subjectsUnlink: [embedSubjectInput]
      subjectsCreate: [createSubjectInput]
      groups: [embedGroupInput]
      groupsUnlink: [embedGroupInput]
      groupsCreate: [createGroupInput]
    }
  `,
});
