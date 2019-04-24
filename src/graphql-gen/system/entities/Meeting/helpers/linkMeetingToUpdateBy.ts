import gql from 'graphql-tag';

export default async function linkMeetingToUpdateBy({
  context,
  updateBy,
  meeting,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToMeetingBelongsToUpdateBy(
          $input: addToMeetingBelongsToUpdateByInput!
        ) {
          addToMeetingBelongsToUpdateBy(input: $input) {
            meeting {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          meeting: meeting.id,
          user: updateBy.id,
        },
      },
    });
  }
}
