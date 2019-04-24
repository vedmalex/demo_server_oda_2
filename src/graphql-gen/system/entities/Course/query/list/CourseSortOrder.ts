import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum CourseSortOrder {
      nameAsc
      nameDesc
      idAsc
      idDesc
    }
  `,
});
