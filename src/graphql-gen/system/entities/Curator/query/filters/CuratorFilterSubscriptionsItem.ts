import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CuratorFilterSubscriptionsItem {
      spiritualName: WhereString
      fullName: WhereString
      person: WhereID
      id: WhereID
    }
  `,
});
