import gql from 'graphql-tag';

export default async function linkEmailToUpdateBy({
  context,
  updateBy,
  email,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToEmailBelongsToUpdateBy(
          $input: addToEmailBelongsToUpdateByInput!
        ) {
          addToEmailBelongsToUpdateBy(input: $input) {
            email {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          email: email.id,
          user: updateBy.id,
        },
      },
    });
  }
}
