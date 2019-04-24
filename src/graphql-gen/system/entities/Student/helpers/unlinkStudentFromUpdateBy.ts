import gql from 'graphql-tag';

export default async function unlinkStudentFromUpdateBy({
  context,
  updateBy,
  student,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentBelongsToUpdateBy(
          $input: removeFromStudentBelongsToUpdateByInput!
        ) {
          removeFromStudentBelongsToUpdateBy(input: $input) {
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
