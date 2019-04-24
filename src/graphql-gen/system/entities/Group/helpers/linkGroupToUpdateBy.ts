import gql from 'graphql-tag';

export default async function linkGroupToUpdateBy({
  context,
  updateBy,
  group,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToGroupBelongsToUpdateBy(
          $input: addToGroupBelongsToUpdateByInput!
        ) {
          addToGroupBelongsToUpdateBy(input: $input) {
            group {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          group: group.id,
          user: updateBy.id,
        },
      },
    });
  }
}
