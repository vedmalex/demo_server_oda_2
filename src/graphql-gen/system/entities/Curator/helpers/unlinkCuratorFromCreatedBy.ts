import gql from 'graphql-tag';

export default async function unlinkCuratorFromCreatedBy({
  context,
  createdBy,
  curator,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromCuratorBelongsToCreatedBy(
          $input: removeFromCuratorBelongsToCreatedByInput!
        ) {
          removeFromCuratorBelongsToCreatedBy(input: $input) {
            curator {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          curator: curator.id,
          user: createdBy.id,
        },
      },
    });
  }
}
