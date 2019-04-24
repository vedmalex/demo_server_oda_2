import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum SubjectSortOrder {
      nameAsc
      nameDesc
      idAsc
      idDesc
    }
  `,
});
