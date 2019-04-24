import gql from 'graphql-tag';

export default async function linkSubjectToUpdateBy({
  context,
  updateBy,
  subject,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectBelongsToUpdateBy(
          $input: addToSubjectBelongsToUpdateByInput!
        ) {
          addToSubjectBelongsToUpdateBy(input: $input) {
            subject {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subject: subject.id,
          user: updateBy.id,
        },
      },
    });
  }
}
