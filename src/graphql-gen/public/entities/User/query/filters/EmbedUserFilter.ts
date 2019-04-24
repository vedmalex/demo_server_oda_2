import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedUserFilter {
      or: [EmbedUserFilterItem]
      and: [EmbedUserFilterItem]
      some: UserFilter
      none: UserFilter
      every: UserFilter
    }
  `,
});
