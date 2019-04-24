import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum PhoneSortOrder {
      phoneNumberAsc
      phoneNumberDesc
      typeAsc
      typeDesc
      idAsc
      idDesc
    }
  `,
});
