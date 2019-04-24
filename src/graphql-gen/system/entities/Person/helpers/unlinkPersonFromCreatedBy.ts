import gql from 'graphql-tag';

export default async function unlinkPersonFromCreatedBy({
  context,
  createdBy,
  person,
}) {
  if (createdBy) {
    await context.userGQL({
      query: gql`
        mutation removeFromPersonBelongsToCreatedBy(
          $input: removeFromPersonBelongsToCreatedByInput!
        ) {
          removeFromPersonBelongsToCreatedBy(input: $input) {
            person {
              id
            }
          }
        }
      `,
      variables: {
        input: {
          person: person.id,
          user: createdBy.id,
        },
      },
    });
  }
}
