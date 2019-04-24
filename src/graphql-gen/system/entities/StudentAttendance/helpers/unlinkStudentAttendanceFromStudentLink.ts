import gql from 'graphql-tag';

export default async function unlinkStudentAttendanceFromStudentLink({
  context,
  studentLink,
  studentAttendance,
}) {
  if (studentLink) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentAttendanceBelongsToStudentLink(
          $input: removeFromStudentAttendanceBelongsToStudentLinkInput!
        ) {
          removeFromStudentAttendanceBelongsToStudentLink(input: $input) {
            studentAttendance {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          studentAttendance: studentAttendance.id,
          student: studentLink.id,
        },
      },
    });
  }
}
