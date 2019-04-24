import gql from 'graphql-tag';

export default async function linkSubjectCourseToCourseLink({
  context,
  courseLink,
  subjectCourse,
}) {
  if (courseLink) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectCourseBelongsToCourseLink(
          $input: addToSubjectCourseBelongsToCourseLinkInput!
        ) {
          addToSubjectCourseBelongsToCourseLink(input: $input) {
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
