import gql from 'graphql-tag';

export default async function unlinkGroupFromUpdateBy({
  context,
  updateBy,
  group,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromGroupBelongsToUpdateBy(
          $input: removeFromGroupBelongsToUpdateByInput!
        ) {
          removeFromGroupBelongsToUpdateBy(input: $input) {
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
