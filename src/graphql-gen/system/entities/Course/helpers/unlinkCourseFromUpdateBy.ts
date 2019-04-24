import gql from 'graphql-tag';

export default async function unlinkCourseFromUpdateBy({
  context,
  updateBy,
  course,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromCourseBelongsToUpdateBy(
          $input: removeFromCourseBelongsToUpdateByInput!
        ) {
          removeFromCourseBelongsToUpdateBy(input: $input) {
            course {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          course: course.id,
          user: updateBy.id,
        },
      },
    });
  }
}
