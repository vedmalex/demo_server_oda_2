import gql from 'graphql-tag';

export default async function linkPersonToAsCurator({
  context,
  asCurator,
  person,
}) {
  if (asCurator) {
    await context.userGQL({
      query: gql`
        mutation addToPersonHasOneAsCurator(
          $input: addToPersonHasOneAsCuratorInput!
        ) {
          addToPersonHasOneAsCurator(input: $input) {
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
