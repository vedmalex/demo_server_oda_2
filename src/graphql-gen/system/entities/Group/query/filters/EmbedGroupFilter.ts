import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedGroupFilter {
      or: [EmbedGroupFilterItem]
      and: [EmbedGroupFilterItem]
      some: GroupFilter
      none: GroupFilter
      every: GroupFilter
    }
  `,
});
