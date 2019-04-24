import gql from 'graphql-tag';

export default async function unlinkPersonFromAsCurator({
  context,
  asCurator,
  person,
}) {
  if (asCurator) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonHasOneAsCurator(
          $input: removeFromPersonHasOneAsCuratorInput!
        ) {
          removeFromPersonHasOneAsCurator(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          curator: asCurator.id,
        },
      },
    });
  }
}
