import gql from 'graphql-tag';

export default async function unlinkStudentFromGroup({
  context,
  group,
  student,
}) {
  if (group) {
    await context.userGQL({
      query: gql`
        mutation removeFromStudentBelongsToGroup(
          $input: removeFromStudentBelongsToGroupInput!
        ) {
          removeFromStudentBelongsToGroup(input: $input) {
            student {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          student: student.id,
          group: group.id,
        },
      },
    });
  }
}
