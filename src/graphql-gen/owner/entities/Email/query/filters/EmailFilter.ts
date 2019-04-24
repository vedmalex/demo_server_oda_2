import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmailFilter {
      or: [EmailFilterItem]
      and: [EmailFilterItem]
      email: WhereString
      type: WhereCommunicationType
      person: WhereID
      id: WhereID
    }
  `,
});
