import gql from 'graphql-tag';

export default async function unlinkSubjectFromUpdateBy({
  context,
  updateBy,
  subject,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectBelongsToUpdateBy(
          $input: removeFromSubjectBelongsToUpdateByInput!
        ) {
          removeFromSubjectBelongsToUpdateBy(input: $input) {
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
