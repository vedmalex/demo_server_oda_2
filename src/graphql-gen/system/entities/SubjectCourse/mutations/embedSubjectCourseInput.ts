import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedSubjectCourseInput {
      id: ID
      description: String
      subject: String
      course: String
      hours: Float
      level: String
      subjectLink: embedSubjectInput
      courseLink: embedCourseInput
    }
  `,
});
