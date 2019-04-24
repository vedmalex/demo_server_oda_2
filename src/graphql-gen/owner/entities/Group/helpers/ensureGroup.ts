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
  } else if (args.name) {
    fArgs = '$name: String';
    filter = 'name: $name';
    variables = {
      name: args.name,
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
              name: args.name,
              course: args.course,
              students: args.students,
              curator: args.curator,
              id: args.id,
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
            name: args.name,
            course: args.course,
            students: args.students,
            curator: args.curator,
            id: args.id,
          },
        },
      })
      .then(r => r.data.updateGroup.group);
  }
  return group;
}
