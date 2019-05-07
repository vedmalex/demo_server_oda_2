import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManySubjectCourseInput {
      id: ID
      description: String
      subject: String
      course: String
      hours: Float
      level: String
      subjectLink: embedSubjectInput
      subjectLinkUnlink: embedSubjectInput
      subjectLinkCreate: createSubjectInput
      courseLink: embedCourseInput
      courseLinkUnlink: embedCourseInput
      courseLinkCreate: createCourseInput
    }
  `,
});
