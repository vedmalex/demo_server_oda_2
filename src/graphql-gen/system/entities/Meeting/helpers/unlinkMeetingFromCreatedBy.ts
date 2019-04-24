import gql from 'graphql-tag';

export default async function unlinkMeetingFromCreatedBy({
  context,
  createdBy,
  meeting,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromMeetingBelongsToCreatedBy(
          $input: removeFromMeetingBelongsToCreatedByInput!
        ) {
          removeFromMeetingBelongsToCreatedBy(input: $input) {
            meeting {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          meeting: meeting.id,
          user: createdBy.id,
        },
      },
    });
  }
}
