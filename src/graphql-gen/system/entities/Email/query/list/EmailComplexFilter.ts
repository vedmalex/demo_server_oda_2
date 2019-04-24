import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input EmailComplexFilter {
      or: [EmailComplexFilter]
      and: [EmailComplexFilter]
      email: WhereString
      type: WhereCommunicationType
      person: WhereID
      id: WhereID
    }
  `,
});
