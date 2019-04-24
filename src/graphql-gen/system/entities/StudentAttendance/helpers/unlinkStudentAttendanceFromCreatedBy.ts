import gql from 'graphql-tag';

export default async function unlinkStudentAttendanceFromCreatedBy({
  context,
  createdBy,
  studentAttendance,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentAttendanceBelongsToCreatedBy(
          $input: removeFromStudentAttendanceBelongsToCreatedByInput!
        ) {
          removeFromStudentAttendanceBelongsToCreatedBy(input: $input) {
            studentAttendance {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          studentAttendance: studentAttendance.id,
          user: createdBy.id,
        },
      },
    });
  }
}
