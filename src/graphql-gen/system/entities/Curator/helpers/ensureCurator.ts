import gql from 'graphql-tag';

export default async function ensureCurator({ args, context, create }) {
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
  let curator;
  if (filter) {
    curator = await context
      .userGQL({
        query: gql`query findCurator(${fArgs}){
            curator(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.curator);
  }

  if (!curator) {
    if (create) {
      curator = await context
        .userGQL({
          query: gql`
            mutation createCurator($curator: createCuratorInput!) {
              createCurator(input: $curator) {
                curator {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            curator: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createCurator.curator.node);
    }
  } else {
    // update
    curator = await context
      .userGQL({
        query: gql`
          mutation updateCurator($curator: updateCuratorInput!) {
            updateCurator(input: $curator) {
              curator {
                id
              }
            }
          }
        `,
        variables: {
          curator: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateCurator.curator);
  }
  return curator;
}
