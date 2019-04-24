import gql from 'graphql-tag';

export default async function linkCourseToSubjects({
  context,
  subjects,
  course,
}) {
  if (subjects) {
    await context.userGQL({
      query: gql`
        mutation addToCourseBelongsToManySubjects(
          $input: addToCourseBelongsToManySubjectsInput!
        ) {
          addToCourseBelongsToManySubjects(input: $input) {
            course {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          course: course.id,
          subject: subjects.id,
        },
      },
    });
  }
}
