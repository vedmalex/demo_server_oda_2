import { Enum } from '../common';
import gql from 'graphql-tag';

export default new Enum({
  schema: gql`
    enum MutationKind {
      CREATE
      UPDATE
      DELETE
      LINK
      UNLINK
    }
  `,
});
