import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input GroupComplexFilter {
      or: [GroupComplexFilter]
      and: [GroupComplexFilter]
      name: WhereString
      course: WhereID
      curator: WhereID
      id: WhereID
    }
  `,
});
