import gql from 'graphql-tag';

export default async function unlinkEmailFromUpdateBy({
  context,
  updateBy,
  email,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromEmailBelongsToUpdateBy(
          $input: removeFromEmailBelongsToUpdateByInput!
        ) {
          removeFromEmailBelongsToUpdateBy(input: $input) {
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
