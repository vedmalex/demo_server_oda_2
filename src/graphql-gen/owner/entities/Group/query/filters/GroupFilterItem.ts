import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input GroupFilterItem {
      name: WhereString
      course: WhereID
      curator: WhereID
      id: WhereID
    }
  `,
});
