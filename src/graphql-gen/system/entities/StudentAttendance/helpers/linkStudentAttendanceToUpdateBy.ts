import gql from 'graphql-tag';

export default async function linkStudentAttendanceToUpdateBy({
  context,
  updateBy,
  studentAttendance,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToStudentAttendanceBelongsToUpdateBy(
          $input: addToStudentAttendanceBelongsToUpdateByInput!
        ) {
          addToStudentAttendanceBelongsToUpdateBy(input: $input) {
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
