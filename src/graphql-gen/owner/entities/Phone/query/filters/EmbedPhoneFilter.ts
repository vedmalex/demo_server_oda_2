import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedPhoneFilter {
      or: [EmbedPhoneFilterItem]
      and: [EmbedPhoneFilterItem]
      some: PhoneFilter
      none: PhoneFilter
      every: PhoneFilter
    }
  `,
});
