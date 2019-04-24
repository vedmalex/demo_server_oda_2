import gql from 'graphql-tag';

export default async function linkMeetingToCreatedBy({
  context,
  createdBy,
  meeting,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToMeetingBelongsToCreatedBy(
          $input: addToMeetingBelongsToCreatedByInput!
        ) {
          addToMeetingBelongsToCreatedBy(input: $input) {
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
