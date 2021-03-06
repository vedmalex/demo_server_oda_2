import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input CourseComplexFilter {
      or: [CourseComplexFilter]
      and: [CourseComplexFilter]
      name: WhereString
      id: WhereID
    }
  `,
});
