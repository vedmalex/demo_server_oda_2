import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedPersonFilterItem {
      some: PersonFilter
      none: PersonFilter
      every: PersonFilter
    }
  `,
});
