import gql from 'graphql-tag';

export default async function linkCuratorToCreatedBy({
  context,
  createdBy,
  curator,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToCuratorBelongsToCreatedBy(
          $input: addToCuratorBelongsToCreatedByInput!
        ) {
          addToCuratorBelongsToCreatedBy(input: $input) {
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
