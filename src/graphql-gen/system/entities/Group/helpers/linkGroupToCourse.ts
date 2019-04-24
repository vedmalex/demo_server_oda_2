import gql from 'graphql-tag';

export default async function linkGroupToCourse({ context, course, group }) {
  if (course) {
    await context.userGQL({
      query: gql`
        mutation addToGroupBelongsToCourse(
          $input: addToGroupBelongsToCourseInput!
        ) {
          addToGroupBelongsToCourse(input: $input) {
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
