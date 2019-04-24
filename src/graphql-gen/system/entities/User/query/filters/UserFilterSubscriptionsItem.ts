import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input UserFilterSubscriptionsItem {
      isAdmin: WhereBoolean
      isSystem: WhereBoolean
      enabled: WhereBoolean
    }
  `,
});
