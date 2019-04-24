import gql from 'graphql-tag';

export default async function linkCuratorToUpdateBy({
  context,
  updateBy,
  curator,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToCuratorBelongsToUpdateBy(
          $input: addToCuratorBelongsToUpdateByInput!
        ) {
          addToCuratorBelongsToUpdateBy(input: $input) {
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
