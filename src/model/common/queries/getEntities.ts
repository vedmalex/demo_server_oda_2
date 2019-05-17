import { Query } from '../../../graphql-gen/system/common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      resources: [String]
    }
  `,
  resolver: (owner, args, context, info) => {
    return ['User', 'Course', 'Email'];
  },
});
