import gql from 'graphql-tag';

export default async function unlinkMeetingFromUpdateBy({
  context,
  updateBy,
  meeting,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromMeetingBelongsToUpdateBy(
          $input: removeFromMeetingBelongsToUpdateByInput!
        ) {
          removeFromMeetingBelongsToUpdateBy(input: $input) {
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
