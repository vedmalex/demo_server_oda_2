import gql from 'graphql-tag';

export default async function unlinkStudentFromMeetings({
  context,
  meetings,
  student,
}) {
  if (meetings) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentBelongsToManyMeetings(
          $input: removeFromStudentBelongsToManyMeetingsInput!
        ) {
          removeFromStudentBelongsToManyMeetings(input: $input) {
            student {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          student: student.id,
          meeting: meetings.id,
        },
      },
    });
  }
}
