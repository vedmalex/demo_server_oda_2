import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SubjectCourseFilterSubscriptionsItem {
      description: WhereString
      subject: WhereString
      course: WhereString
      subjectLink: WhereID
      courseLink: WhereID
      hours: WhereFloat
      level: WhereString
      id: WhereID
    }
  `,
});
