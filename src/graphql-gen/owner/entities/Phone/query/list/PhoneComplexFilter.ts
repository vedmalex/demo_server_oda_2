import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input PhoneComplexFilter {
      or: [PhoneComplexFilter]
      and: [PhoneComplexFilter]
      phoneNumber: WhereString
      type: WhereCommunicationType
      person: WhereID
      id: WhereID
    }
  `,
});
