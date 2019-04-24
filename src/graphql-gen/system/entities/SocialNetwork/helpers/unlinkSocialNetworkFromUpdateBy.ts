import gql from 'graphql-tag';

export default async function unlinkSocialNetworkFromUpdateBy({
  context,
  updateBy,
  socialNetwork,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromSocialNetworkBelongsToUpdateBy(
          $input: removeFromSocialNetworkBelongsToUpdateByInput!
        ) {
          removeFromSocialNetworkBelongsToUpdateBy(input: $input) {
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
