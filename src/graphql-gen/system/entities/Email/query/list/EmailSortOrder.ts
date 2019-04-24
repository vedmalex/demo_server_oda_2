import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum EmailSortOrder {
      emailAsc
      emailDesc
      typeAsc
      typeDesc
      idAsc
      idDesc
    }
  `,
});
