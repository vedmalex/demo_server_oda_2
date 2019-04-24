import gql from 'graphql-tag';

export default async function linkGroupToCurator({ context, curator, group }) {
  if (curator) {
    await context.userGQL({
      query: gql`
        mutation addToGroupBelongsToCurator(
          $input: addToGroupBelongsToCuratorInput!
        ) {
          addToGroupBelongsToCurator(input: $input) {
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
