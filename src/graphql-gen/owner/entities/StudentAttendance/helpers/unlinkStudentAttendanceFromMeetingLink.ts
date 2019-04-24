import gql from 'graphql-tag';

export default async function unlinkStudentAttendanceFromMeetingLink({
  context,
  meetingLink,
  studentAttendance,
}) {
  if (meetingLink) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentAttendanceBelongsToMeetingLink(
          $input: removeFromStudentAttendanceBelongsToMeetingLinkInput!
        ) {
          removeFromStudentAttendanceBelongsToMeetingLink(input: $input) {
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
