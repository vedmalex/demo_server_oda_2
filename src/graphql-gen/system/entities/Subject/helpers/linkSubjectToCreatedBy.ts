import gql from 'graphql-tag';

export default async function linkSubjectToCreatedBy({
  context,
  createdBy,
  subject,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectBelongsToCreatedBy(
          $input: addToSubjectBelongsToCreatedByInput!
        ) {
          addToSubjectBelongsToCreatedBy(input: $input) {
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
