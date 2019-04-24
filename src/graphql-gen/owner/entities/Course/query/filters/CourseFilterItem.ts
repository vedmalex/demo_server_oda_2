import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CourseFilterItem {
      name: WhereString
      id: WhereID
    }
  `,
});
