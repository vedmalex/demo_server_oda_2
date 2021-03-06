import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmailFilterItem {
      email: WhereString
      type: WhereCommunicationType
      id: WhereID
    }
  `,
});
