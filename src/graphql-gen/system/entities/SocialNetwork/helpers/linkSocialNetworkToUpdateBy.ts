import gql from 'graphql-tag';

export default async function linkSocialNetworkToUpdateBy({
  context,
  updateBy,
  socialNetwork,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToSocialNetworkBelongsToUpdateBy(
          $input: addToSocialNetworkBelongsToUpdateByInput!
        ) {
          addToSocialNetworkBelongsToUpdateBy(input: $input) {
            socialNetwork {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          socialNetwork: socialNetwork.id,
          user: updateBy.id,
        },
      },
    });
  }
}
