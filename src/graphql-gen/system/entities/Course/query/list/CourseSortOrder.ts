import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum CourseSortOrder {
      createdAtAsc
      createdAtDesc
      updatedAtAsc
      updatedAtDesc
      removedAsc
      removedDesc
      ownerAsc
      ownerDesc
    }
  `,
});
