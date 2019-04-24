import gql from 'graphql-tag';

export default async function linkStudentAttendanceToMeetingLink({
  context,
  meetingLink,
  studentAttendance,
}) {
  if (meetingLink) {
    await context.userGQL({
      query: gql`
        mutation addToStudentAttendanceBelongsToMeetingLink(
          $input: addToStudentAttendanceBelongsToMeetingLinkInput!
        ) {
          addToStudentAttendanceBelongsToMeetingLink(input: $input) {
            studentAttendance {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          studentAttendance: studentAttendance.id,
          meeting: meetingLink.id,
        },
      },
    });
  }
}
