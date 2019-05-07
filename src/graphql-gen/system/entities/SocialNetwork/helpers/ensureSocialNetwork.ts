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
  } else if (args.account) {
    fArgs = '$account: String';
    filter = 'account: $account';
    variables = {
      account: args.account,
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
      .then(r => r.data && r.data.socialNetwork);
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
              account: args.account,
              url: args.url,
              type: args.type,
              id: args.id,
            },
          },
        })
        .then(
          r =>
            r.data &&
            r.data.createSocialNetwork &&
            r.data.createSocialNetwork.socialNetwork &&
            r.data.createSocialNetwork.socialNetwork.node,
        );
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
            account: args.account,
            url: args.url,
            type: args.type,
            id: args.id,
          },
        },
      })
      .then(
        r =>
          r.data &&
          r.data.updateSocialNetwork &&
          r.data.updateSocialNetwork.socialNetwork,
      );
  }
  return socialNetwork;
}
