import gql from 'graphql-tag';

export default async function ensureSocialNetwork({ args, context, create }) {
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
  let socialNetwork;
  if (filter) {
    socialNetwork = await context
      .userGQL({
        query: gql`query findSocialNetwork(${fArgs}){
            socialNetwork(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.socialNetwork);
  }

  if (!socialNetwork) {
    if (create) {
      socialNetwork = await context
        .userGQL({
          query: gql`
            mutation createSocialNetwork(
              $socialNetwork: createSocialNetworkInput!
            ) {
              createSocialNetwork(input: $socialNetwork) {
                socialNetwork {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            socialNetwork: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createSocialNetwork.socialNetwork.node);
    }
  } else {
    // update
    socialNetwork = await context
      .userGQL({
        query: gql`
          mutation updateSocialNetwork(
            $socialNetwork: updateSocialNetworkInput!
          ) {
            updateSocialNetwork(input: $socialNetwork) {
              socialNetwork {
                id
              }
            }
          }
        `,
        variables: {
          socialNetwork: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateSocialNetwork.socialNetwork);
  }
  return socialNetwork;
}
