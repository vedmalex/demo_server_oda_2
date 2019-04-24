import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum SubjectCourseSortOrder {
      descriptionAsc
      descriptionDesc
      subjectAsc
      subjectDesc
      courseAsc
      courseDesc
      hoursAsc
      hoursDesc
      levelAsc
      levelDesc
      idAsc
      idDesc
    }
  `,
});
