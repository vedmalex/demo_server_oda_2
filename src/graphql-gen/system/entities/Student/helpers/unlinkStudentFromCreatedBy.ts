import gql from 'graphql-tag';

export default async function unlinkStudentFromCreatedBy({
  context,
  createdBy,
  student,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentBelongsToCreatedBy(
          $input: removeFromStudentBelongsToCreatedByInput!
        ) {
          removeFromStudentBelongsToCreatedBy(input: $input) {
            student {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          student: student.id,
          user: createdBy.id,
        },
      },
    });
  }
}
