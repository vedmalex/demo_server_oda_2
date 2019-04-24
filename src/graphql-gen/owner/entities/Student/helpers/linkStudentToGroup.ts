import gql from 'graphql-tag';

export default async function linkStudentToGroup({ context, group, student }) {
  if (group) {
    await context.userGQL({
      query: gql`
        mutation addToStudentBelongsToGroup(
          $input: addToStudentBelongsToGroupInput!
        ) {
          addToStudentBelongsToGroup(input: $input) {
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
