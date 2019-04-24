import { Input } from '../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input WhereSocialNetworkType {
      eq: SocialNetworkType
      ne: SocialNetworkType
      in: [SocialNetworkType!]
      nin: [SocialNetworkType!]
      and: [WhereSocialNetworkType!]
      or: [WhereSocialNetworkType!]
      nor: [WhereSocialNetworkType!]
      not: [WhereSocialNetworkType!]
      exists: Boolean
    }
  `,
});
