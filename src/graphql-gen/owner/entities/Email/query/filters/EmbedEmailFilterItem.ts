import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedEmailFilterItem {
      some: EmailFilter
      none: EmailFilter
      every: EmailFilter
    }
  `,
});
