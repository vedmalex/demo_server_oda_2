import gql from 'graphql-tag';

export default async function linkStudentAttendanceToCreatedBy({
  context,
  createdBy,
  studentAttendance,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToStudentAttendanceBelongsToCreatedBy(
          $input: addToStudentAttendanceBelongsToCreatedByInput!
        ) {
          addToStudentAttendanceBelongsToCreatedBy(input: $input) {
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
