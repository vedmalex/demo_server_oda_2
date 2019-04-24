import gql from 'graphql-tag';

export default async function unlinkSocialNetworkFromPerson({
  context,
  person,
  socialNetwork,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation removeFromSocialNetworkBelongsToPerson(
          $input: removeFromSocialNetworkBelongsToPersonInput!
        ) {
          removeFromSocialNetworkBelongsToPerson(input: $input) {
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
