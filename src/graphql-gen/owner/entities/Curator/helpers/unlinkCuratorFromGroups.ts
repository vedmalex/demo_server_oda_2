import gql from 'graphql-tag';

export default async function unlinkCuratorFromGroups({
  context,
  groups,
  curator,
}) {
  if (groups) {
    await context.userGQL({
      query: gql`
        mutation removeFromCuratorHasManyGroups(
          $input: removeFromCuratorHasManyGroupsInput!
        ) {
          removeFromCuratorHasManyGroups(input: $input) {
            curator {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          curator: curator.id,
          group: groups.id,
        },
      },
    });
  }
}
