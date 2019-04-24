import gql from 'graphql-tag';

export default async function unlinkSubjectCourseFromUpdateBy({
  context,
  updateBy,
  subjectCourse,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectCourseBelongsToUpdateBy(
          $input: removeFromSubjectCourseBelongsToUpdateByInput!
        ) {
          removeFromSubjectCourseBelongsToUpdateBy(input: $input) {
            subjectCourse {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subjectCourse: subjectCourse.id,
          user: updateBy.id,
        },
      },
    });
  }
}
