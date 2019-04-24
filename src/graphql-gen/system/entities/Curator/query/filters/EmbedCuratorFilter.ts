import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedCuratorFilter {
      or: [EmbedCuratorFilterItem]
      and: [EmbedCuratorFilterItem]
      some: CuratorFilter
      none: CuratorFilter
      every: CuratorFilter
    }
  `,
});
