import gql from 'graphql-tag';

export default async function unlinkEmailFromCreatedBy({
  context,
  createdBy,
  email,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromEmailBelongsToCreatedBy(
          $input: removeFromEmailBelongsToCreatedByInput!
        ) {
          removeFromEmailBelongsToCreatedBy(input: $input) {
            email {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          email: email.id,
          user: createdBy.id,
        },
      },
    });
  }
}
