import gql from 'graphql-tag';

export default async function linkSubjectCourseToSubjectLink({
  context,
  subjectLink,
  subjectCourse,
}) {
  if (subjectLink) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectCourseBelongsToSubjectLink(
          $input: addToSubjectCourseBelongsToSubjectLinkInput!
        ) {
          addToSubjectCourseBelongsToSubjectLink(input: $input) {
            subjectCourse {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subjectCourse: subjectCourse.id,
          subject: subjectLink.id,
        },
      },
    });
  }
}
