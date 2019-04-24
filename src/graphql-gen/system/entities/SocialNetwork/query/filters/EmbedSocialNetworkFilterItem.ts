import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedSocialNetworkFilterItem {
      some: SocialNetworkFilter
      none: SocialNetworkFilter
      every: SocialNetworkFilter
    }
  `,
});
