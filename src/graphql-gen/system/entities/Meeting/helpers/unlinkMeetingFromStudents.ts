import gql from 'graphql-tag';

export default async function unlinkMeetingFromStudents({
  context,
  students,
  meeting,
}) {
  if (students) {
    await context.userGQL({
      query: gql`
        mutation removeFromMeetingBelongsToManyStudents(
          $input: removeFromMeetingBelongsToManyStudentsInput!
        ) {
          removeFromMeetingBelongsToManyStudents(input: $input) {
            meeting {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          meeting: meeting.id,
          student: students.id,
        },
      },
    });
  }
}
