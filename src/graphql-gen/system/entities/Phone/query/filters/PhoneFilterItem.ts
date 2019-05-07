import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input PhoneFilterItem {
      phoneNumber: WhereString
      type: WhereCommunicationType
      id: WhereID
    }
  `,
});
