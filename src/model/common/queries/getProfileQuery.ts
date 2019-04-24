import { Query } from '../../../graphql-gen/system/common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      getProfile: String
    }
  `,
  resolver: (owner, args, context, info) => context.userGroup || 'public',
});
