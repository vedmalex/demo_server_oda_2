import gql from 'graphql-tag';

export default async function unlinkCuratorFromUpdateBy({
  context,
  updateBy,
  curator,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromCuratorBelongsToUpdateBy(
          $input: removeFromCuratorBelongsToUpdateByInput!
        ) {
          removeFromCuratorBelongsToUpdateBy(input: $input) {
            curator {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          curator: curator.id,
          user: updateBy.id,
        },
      },
    });
  }
}
