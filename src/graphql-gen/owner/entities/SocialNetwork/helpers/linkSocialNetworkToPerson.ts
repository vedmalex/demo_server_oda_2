import gql from 'graphql-tag';

export default async function linkSocialNetworkToPerson({
  context,
  person,
  socialNetwork,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation addToSocialNetworkBelongsToPerson(
          $input: addToSocialNetworkBelongsToPersonInput!
        ) {
          addToSocialNetworkBelongsToPerson(input: $input) {
            socialNetwork {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          socialNetwork: socialNetwork.id,
          person: person.id,
        },
      },
    });
  }
}
