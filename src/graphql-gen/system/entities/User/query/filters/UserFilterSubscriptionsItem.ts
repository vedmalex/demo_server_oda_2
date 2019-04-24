import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input UserFilterSubscriptionsItem {
      userName: WhereString
      password: WhereString
      isAdmin: WhereBoolean
      isSystem: WhereBoolean
      enabled: WhereBoolean
      id: WhereID
    }
  `,
});
