import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum PersonSortOrder {
      spiritualNameAsc
      spiritualNameDesc
      fullNameAsc
      fullNameDesc
      dateOfBirthAsc
      dateOfBirthDesc
      specialNotesAsc
      specialNotesDesc
      idAsc
      idDesc
    }
  `,
});
