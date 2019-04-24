import gql from 'graphql-tag';

export default async function unlinkSocialNetworkFromCreatedBy({
  context,
  createdBy,
  socialNetwork,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromSocialNetworkBelongsToCreatedBy(
          $input: removeFromSocialNetworkBelongsToCreatedByInput!
        ) {
          removeFromSocialNetworkBelongsToCreatedBy(input: $input) {
            socialNetwork {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          socialNetwork: socialNetwork.id,
          user: createdBy.id,
        },
      },
    });
  }
}
