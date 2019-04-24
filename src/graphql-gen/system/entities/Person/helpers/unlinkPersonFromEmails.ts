import gql from 'graphql-tag';

export default async function unlinkPersonFromEmails({
  context,
  emails,
  person,
}) {
  if (emails) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonHasManyEmails(
          $input: removeFromPersonHasManyEmailsInput!
        ) {
          removeFromPersonHasManyEmails(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          email: emails.id,
        },
      },
    });
  }
}
