import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedPersonFilter {
      or: [EmbedPersonFilterItem]
      and: [EmbedPersonFilterItem]
      some: PersonFilter
      none: PersonFilter
      every: PersonFilter
    }
  `,
});
