import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum UserSortOrder {
      isAdminAsc
      isAdminDesc
      isSystemAsc
      isSystemDesc
      enabledAsc
      enabledDesc
    }
  `,
});
