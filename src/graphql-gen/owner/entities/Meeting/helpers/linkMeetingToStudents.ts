import gql from 'graphql-tag';

export default async function linkMeetingToStudents({
  context,
  students,
  meeting,
  present,
  specialNotes,
  superpuper,
}) {
  if (students) {
    await context.userGQL({
      query: gql`
        mutation addToMeetingBelongsToManyStudents(
          $input: addToMeetingBelongsToManyStudentsInput!
        ) {
          addToMeetingBelongsToManyStudents(input: $input) {
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
          present,
          specialNotes,
          superpuper,
        },
      },
    });
  }
}
