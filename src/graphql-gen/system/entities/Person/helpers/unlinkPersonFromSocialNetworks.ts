import gql from 'graphql-tag';

export default async function unlinkPersonFromSocialNetworks({
  context,
  socialNetworks,
  person,
}) {
  if (socialNetworks) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonHasManySocialNetworks(
          $input: removeFromPersonHasManySocialNetworksInput!
        ) {
          removeFromPersonHasManySocialNetworks(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          socialNetwork: socialNetworks.id,
        },
      },
    });
  }
}
