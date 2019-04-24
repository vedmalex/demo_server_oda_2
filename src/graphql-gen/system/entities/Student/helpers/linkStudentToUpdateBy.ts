import gql from 'graphql-tag';

export default async function linkStudentToUpdateBy({
  context,
  updateBy,
  student,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToStudentBelongsToUpdateBy(
          $input: addToStudentBelongsToUpdateByInput!
        ) {
          addToStudentBelongsToUpdateBy(input: $input) {
            student {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          student: student.id,
          user: updateBy.id,
        },
      },
    });
  }
}
