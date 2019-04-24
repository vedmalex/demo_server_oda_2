import gql from 'graphql-tag';

export default async function unlinkPhoneFromUpdateBy({
  context,
  updateBy,
  phone,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromPhoneBelongsToUpdateBy(
          $input: removeFromPhoneBelongsToUpdateByInput!
        ) {
          removeFromPhoneBelongsToUpdateBy(input: $input) {
            phone {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          phone: phone.id,
          user: updateBy.id,
        },
      },
    });
  }
}
