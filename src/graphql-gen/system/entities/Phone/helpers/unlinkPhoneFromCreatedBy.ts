import gql from 'graphql-tag';

export default async function unlinkPhoneFromCreatedBy({
  context,
  createdBy,
  phone,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromPhoneBelongsToCreatedBy(
          $input: removeFromPhoneBelongsToCreatedByInput!
        ) {
          removeFromPhoneBelongsToCreatedBy(input: $input) {
            phone {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          phone: phone.id,
          user: createdBy.id,
        },
      },
    });
  }
}
