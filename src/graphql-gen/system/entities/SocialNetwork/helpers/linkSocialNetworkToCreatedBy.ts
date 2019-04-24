import gql from 'graphql-tag';

export default async function linkSocialNetworkToCreatedBy({
  context,
  createdBy,
  socialNetwork,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToSocialNetworkBelongsToCreatedBy(
          $input: addToSocialNetworkBelongsToCreatedByInput!
        ) {
          addToSocialNetworkBelongsToCreatedBy(input: $input) {
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
