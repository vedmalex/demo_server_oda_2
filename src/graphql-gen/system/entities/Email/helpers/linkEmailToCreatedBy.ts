import gql from 'graphql-tag';

export default async function linkEmailToCreatedBy({
  context,
  createdBy,
  email,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToEmailBelongsToCreatedBy(
          $input: addToEmailBelongsToCreatedByInput!
        ) {
          addToEmailBelongsToCreatedBy(input: $input) {
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
