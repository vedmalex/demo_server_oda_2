import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedEmailFilter {
      or: [EmbedEmailFilterItem]
      and: [EmbedEmailFilterItem]
      some: EmailFilter
      none: EmailFilter
      every: EmailFilter
    }
  `,
});
