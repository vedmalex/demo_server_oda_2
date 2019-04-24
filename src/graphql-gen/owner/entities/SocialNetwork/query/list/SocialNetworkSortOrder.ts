import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum SocialNetworkSortOrder {
      accountAsc
      accountDesc
      urlAsc
      urlDesc
      typeAsc
      typeDesc
      idAsc
      idDesc
    }
  `,
});
