import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum UserSortOrder {
      userNameAsc
      userNameDesc
      passwordAsc
      passwordDesc
      isAdminAsc
      isAdminDesc
      isSystemAsc
      isSystemDesc
      enabledAsc
      enabledDesc
      idAsc
      idDesc
    }
  `,
});
