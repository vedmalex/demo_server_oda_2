import gql from 'graphql-tag';

export default async function unlinkPersonFromUpdateBy({
  context,
  updateBy,
  person,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonBelongsToUpdateBy(
          $input: removeFromPersonBelongsToUpdateByInput!
        ) {
          removeFromPersonBelongsToUpdateBy(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          user: updateBy.id,
        },
      },
    });
  }
}
