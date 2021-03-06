import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SocialNetworkFilterItem {
      account: WhereString
      url: WhereString
      type: WhereSocialNetworkType
      id: WhereID
    }
  `,
});
