import gql from 'graphql-tag';

export default async function linkStudentToMeetings({
  context,
  meetings,
  student,
}) {
  if (meetings) {
    await context.userGQL({
      query: gql`
        mutation addToStudentBelongsToManyMeetings(
          $input: addToStudentBelongsToManyMeetingsInput!
        ) {
          addToStudentBelongsToManyMeetings(input: $input) {
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
