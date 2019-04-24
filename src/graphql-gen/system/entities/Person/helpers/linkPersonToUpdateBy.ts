import gql from 'graphql-tag';

export default async function linkPersonToUpdateBy({
  context,
  updateBy,
  person,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToPersonBelongsToUpdateBy(
          $input: addToPersonBelongsToUpdateByInput!
        ) {
          addToPersonBelongsToUpdateBy(input: $input) {
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
