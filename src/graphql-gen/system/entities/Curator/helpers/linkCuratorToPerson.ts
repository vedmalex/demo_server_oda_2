import gql from 'graphql-tag';

export default async function linkCuratorToPerson({
  context,
  person,
  curator,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation addToCuratorBelongsToPerson(
          $input: addToCuratorBelongsToPersonInput!
        ) {
          addToCuratorBelongsToPerson(input: $input) {
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
