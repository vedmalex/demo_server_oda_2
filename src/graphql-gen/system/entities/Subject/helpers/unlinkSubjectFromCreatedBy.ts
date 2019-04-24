import gql from 'graphql-tag';

export default async function unlinkSubjectFromCreatedBy({
  context,
  createdBy,
  subject,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectBelongsToCreatedBy(
          $input: removeFromSubjectBelongsToCreatedByInput!
        ) {
          removeFromSubjectBelongsToCreatedBy(input: $input) {
            subject {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subject: subject.id,
          user: createdBy.id,
        },
      },
    });
  }
}
