import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input StudentFilter {
      or: [StudentFilterItem]
      and: [StudentFilterItem]
      person: WhereID
      group: WhereID
      id: WhereID
    }
  `,
});
