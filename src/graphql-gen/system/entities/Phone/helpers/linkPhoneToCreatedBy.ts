import gql from 'graphql-tag';

export default async function linkPhoneToCreatedBy({
  context,
  createdBy,
  phone,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation addToPhoneBelongsToCreatedBy(
          $input: addToPhoneBelongsToCreatedByInput!
        ) {
          addToPhoneBelongsToCreatedBy(input: $input) {
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
