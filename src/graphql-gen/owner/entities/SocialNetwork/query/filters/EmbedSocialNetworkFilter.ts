import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedSocialNetworkFilter {
      or: [EmbedSocialNetworkFilterItem]
      and: [EmbedSocialNetworkFilterItem]
      some: SocialNetworkFilter
      none: SocialNetworkFilter
      every: SocialNetworkFilter
    }
  `,
});
