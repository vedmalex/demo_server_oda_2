import gql from 'graphql-tag';

export default async function unlinkGroupFromCourse({
  context,
  course,
  group,
}) {
  if (course) {
    await context.userGQL({
      query: gql`
        mutation removeFromGroupBelongsToCourse(
          $input: removeFromGroupBelongsToCourseInput!
        ) {
          removeFromGroupBelongsToCourse(input: $input) {
            group {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          group: group.id,
          course: course.id,
        },
      },
    });
  }
}
