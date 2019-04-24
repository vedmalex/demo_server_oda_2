import { Input } from '../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input WhereCommunicationType {
      eq: CommunicationType
      ne: CommunicationType
      in: [CommunicationType!]
      nin: [CommunicationType!]
      and: [WhereCommunicationType!]
      or: [WhereCommunicationType!]
      nor: [WhereCommunicationType!]
      not: [WhereCommunicationType!]
      exists: Boolean
    }
  `,
});
