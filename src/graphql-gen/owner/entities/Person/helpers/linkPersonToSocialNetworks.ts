import gql from 'graphql-tag';

export default async function linkPersonToSocialNetworks({
  context,
  socialNetworks,
  person,
}) {
  if (socialNetworks) {
    await context.userGQL({
      query: gql`
        mutation addToPersonHasManySocialNetworks(
          $input: addToPersonHasManySocialNetworksInput!
        ) {
          addToPersonHasManySocialNetworks(input: $input) {
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
