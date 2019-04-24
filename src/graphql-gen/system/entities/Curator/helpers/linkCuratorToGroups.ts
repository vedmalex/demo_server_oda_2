import gql from 'graphql-tag';

export default async function linkCuratorToGroups({
  context,
  groups,
  curator,
}) {
  if (groups) {
    await context.userGQL({
      query: gql`
        mutation addToCuratorHasManyGroups(
          $input: addToCuratorHasManyGroupsInput!
        ) {
          addToCuratorHasManyGroups(input: $input) {
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
