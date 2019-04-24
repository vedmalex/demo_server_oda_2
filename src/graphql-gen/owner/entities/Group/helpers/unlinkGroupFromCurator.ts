import gql from 'graphql-tag';

export default async function unlinkGroupFromCurator({
  context,
  curator,
  group,
}) {
  if (curator) {
    await context.userGQL({
      query: gql`
        mutation removeFromGroupBelongsToCurator(
          $input: removeFromGroupBelongsToCuratorInput!
        ) {
          removeFromGroupBelongsToCurator(input: $input) {
            group {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          group: group.id,
          curator: curator.id,
        },
      },
    });
  }
}
