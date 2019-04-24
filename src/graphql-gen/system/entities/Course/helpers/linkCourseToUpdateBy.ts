import gql from 'graphql-tag';

export default async function linkCourseToUpdateBy({
  context,
  updateBy,
  course,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToCourseBelongsToUpdateBy(
          $input: addToCourseBelongsToUpdateByInput!
        ) {
          addToCourseBelongsToUpdateBy(input: $input) {
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
