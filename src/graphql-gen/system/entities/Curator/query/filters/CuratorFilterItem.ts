import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CuratorFilterItem {
      spiritualName: WhereString
      fullName: WhereString
      person: WhereID
      id: WhereID
    }
  `,
});
