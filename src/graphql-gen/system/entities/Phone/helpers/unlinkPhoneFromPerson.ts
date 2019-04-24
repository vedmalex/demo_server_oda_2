import gql from 'graphql-tag';

export default async function unlinkPhoneFromPerson({
  context,
  person,
  phone,
}) {
  if (person) {
    await context.userGQL({
      query: gql`
        mutation removeFromPhoneBelongsToPerson(
          $input: removeFromPhoneBelongsToPersonInput!
        ) {
          removeFromPhoneBelongsToPerson(input: $input) {
            phone {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          phone: phone.id,
          person: person.id,
        },
      },
    });
  }
}
