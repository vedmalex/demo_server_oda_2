import gql from 'graphql-tag';

export default async function unlinkPersonFromPhones({
  context,
  phones,
  person,
}) {
  if (phones) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonHasManyPhones(
          $input: removeFromPersonHasManyPhonesInput!
        ) {
          removeFromPersonHasManyPhones(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          phone: phones.id,
        },
      },
    });
  }
}
