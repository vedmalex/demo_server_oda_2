import gql from 'graphql-tag';

export default async function linkSubjectToCourse({
  context,
  course,
  subject,
  hours,
  level,
}) {
  if (course) {
    await context.userGQL({
      query: gql`
        mutation addToSubjectBelongsToManyCourses(
          $input: addToSubjectBelongsToManyCoursesInput!
        ) {
          addToSubjectBelongsToManyCourses(input: $input) {
            subject {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          subject: subject.id,
          course: course.id,
          hours,
          level,
        },
      },
    });
  }
}
