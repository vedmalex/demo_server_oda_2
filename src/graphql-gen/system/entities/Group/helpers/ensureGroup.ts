import gql from 'graphql-tag';

export default async function ensureGroup({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let group;
  if (filter) {
    group = await context
      .userGQL({
        query: gql`query findGroup(${fArgs}){
            group(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.group);
  }

  if (!group) {
    if (create) {
      group = await context
        .userGQL({
          query: gql`
            mutation createGroup($group: createGroupInput!) {
              createGroup(input: $group) {
                group {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            group: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createGroup.group.node);
    }
  } else {
    // update
    group = await context
      .userGQL({
        query: gql`
          mutation updateGroup($group: updateGroupInput!) {
            updateGroup(input: $group) {
              group {
                id
              }
            }
          }
        `,
        variables: {
          group: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateGroup.group);
  }
  return group;
}
