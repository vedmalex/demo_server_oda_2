import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input StudentFilterSubscriptionsItem {
      person: WhereID
      group: WhereID
      id: WhereID
    }
  `,
});
