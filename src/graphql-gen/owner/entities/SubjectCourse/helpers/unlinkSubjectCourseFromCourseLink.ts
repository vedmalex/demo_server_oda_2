import gql from 'graphql-tag';

export default async function unlinkSubjectCourseFromCourseLink({
  context,
  courseLink,
  subjectCourse,
}) {
  if (courseLink) {
    await context.userGQL({
      query: gql`
        mutation removeFromSubjectCourseBelongsToCourseLink(
          $input: removeFromSubjectCourseBelongsToCourseLinkInput!
        ) {
          removeFromSubjectCourseBelongsToCourseLink(input: $input) {
            subjectCourse {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subjectCourse: subjectCourse.id,
          course: courseLink.id,
        },
      },
    });
  }
}
