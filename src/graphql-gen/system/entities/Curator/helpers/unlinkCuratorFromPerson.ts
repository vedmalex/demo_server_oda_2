import gql from 'graphql-tag';

export default async function unlinkCuratorFromPerson({
  context,
  person,
  curator,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation removeFromCuratorBelongsToPerson(
          $input: removeFromCuratorBelongsToPersonInput!
        ) {
          removeFromCuratorBelongsToPerson(input: $input) {
            curator {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          curator: curator.id,
          person: person.id,
        },
      },
    });
  }
}
