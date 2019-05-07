import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input SocialNetworkComplexFilter {
      or: [SocialNetworkComplexFilter]
      and: [SocialNetworkComplexFilter]
      account: WhereString
      url: WhereString
      type: WhereSocialNetworkType
      id: WhereID
    }
  `,
});
