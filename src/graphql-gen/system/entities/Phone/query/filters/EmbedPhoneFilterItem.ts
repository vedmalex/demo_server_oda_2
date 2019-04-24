import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedPhoneFilterItem {
      some: PhoneFilter
      none: PhoneFilter
      every: PhoneFilter
    }
  `,
});
