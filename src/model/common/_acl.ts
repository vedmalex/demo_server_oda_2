import { acl } from 'oda-api-graphql';
import { runtimeMutationAcl } from '../hooks';

import getLogger from 'oda-logger';
let logger = getLogger('graphql:register:');

import { Query } from '../../graphql-gen/system/common';
import gql from 'graphql-tag';

const securedMutations = new acl.secureMutations.SecureMutation({
  acls: runtimeMutationAcl,
});

const allow = securedMutations.allow.bind(securedMutations);

const check = (mutations, group) => {
  return mutations.map(m => ({ key: m, value: !!allow(group, m) })).reduce(
    (result, curr) => {
      if (!curr.value) {
        result[curr.key] = curr.value;
      }
      return result;
    },
    { '*': true },
  );
};

export default new Query({
  schema: gql`
    type RootQuery {
      _acl(mutation: [String!]): JSON
    }
  `,
  resolver: async (
    owner,
    args: {
      mutation: string[];
    },
    context,
    info,
  ) => {
    logger.trace('_acl');
    const group = context.userGroup;
    if (args.mutation && args.mutation.length > 0) {
      return check(args.mutation, group);
    } else {
      return check(
        Object.keys(info.schema.getMutationType().getFields()),
        group,
      );
    }
  },
});
