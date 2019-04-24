import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input StudentComplexFilter {
      or: [StudentComplexFilter]
      and: [StudentComplexFilter]
      person: WhereID
      group: WhereID
      id: WhereID
    }
  `,
});
