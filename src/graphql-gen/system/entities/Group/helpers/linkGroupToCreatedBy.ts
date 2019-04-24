import gql from 'graphql-tag';

export default async function linkGroupToCreatedBy({
  context,
  createdBy,
  group,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToGroupBelongsToCreatedBy(
          $input: addToGroupBelongsToCreatedByInput!
        ) {
          addToGroupBelongsToCreatedBy(input: $input) {
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
