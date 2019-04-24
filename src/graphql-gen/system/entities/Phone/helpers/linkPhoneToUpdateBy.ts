import gql from 'graphql-tag';

export default async function linkPhoneToUpdateBy({
  context,
  updateBy,
  phone,
}) {
  if (updateBy) {
    await context.userGQL({
      query: gql`
        mutation addToPhoneBelongsToUpdateBy(
          $input: addToPhoneBelongsToUpdateByInput!
        ) {
          addToPhoneBelongsToUpdateBy(input: $input) {
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
