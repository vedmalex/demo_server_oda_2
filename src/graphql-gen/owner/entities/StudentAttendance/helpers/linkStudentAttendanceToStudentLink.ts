import gql from 'graphql-tag';

export default async function linkStudentAttendanceToStudentLink({
  context,
  studentLink,
  studentAttendance,
}) {
  if (studentLink) {
    await context.userGQL({
      query: gql`
        mutation addToStudentAttendanceBelongsToStudentLink(
          $input: addToStudentAttendanceBelongsToStudentLinkInput!
        ) {
          addToStudentAttendanceBelongsToStudentLink(input: $input) {
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
