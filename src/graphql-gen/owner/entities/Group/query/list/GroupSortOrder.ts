import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum GroupSortOrder {
      nameAsc
      nameDesc
      idAsc
      idDesc
    }
  `,
});
