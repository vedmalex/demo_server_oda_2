import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedCuratorFilterItem {
      some: CuratorFilter
      none: CuratorFilter
      every: CuratorFilter
    }
  `,
});
