import gql from 'graphql-tag';

export default async function unlinkGroupFromCreatedBy({
  context,
  createdBy,
  group,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromGroupBelongsToCreatedBy(
          $input: removeFromGroupBelongsToCreatedByInput!
        ) {
          removeFromGroupBelongsToCreatedBy(input: $input) {
            group {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          group: group.id,
          user: createdBy.id,
        },
      },
    });
  }
}
