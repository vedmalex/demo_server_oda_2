import gql from 'graphql-tag';

export default async function unlinkStudentAttendanceFromUpdateBy({
  context,
  updateBy,
  studentAttendance,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentAttendanceBelongsToUpdateBy(
          $input: removeFromStudentAttendanceBelongsToUpdateByInput!
        ) {
          removeFromStudentAttendanceBelongsToUpdateBy(input: $input) {
            studentAttendance {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          studentAttendance: studentAttendance.id,
          user: updateBy.id,
        },
      },
    });
  }
}
