import gql from 'graphql-tag';

export default async function ensureEmail({ args, context, create }) {
  // find
  let filter;
  let fArgs;
  let variables;
  if (args.id) {
    fArgs = '$id: ID';
    filter = 'id: $id';
    variables = {
      id: args.id,
    };
  }
  let email;
  if (filter) {
    email = await context
      .userGQL({
        query: gql`query findEmail(${fArgs}){
            email(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.email);
  }

  if (!email) {
    if (create) {
      email = await context
        .userGQL({
          query: gql`
            mutation createEmail($email: createEmailInput!) {
              createEmail(input: $email) {
                email {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            email: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createEmail.email.node);
    }
  } else {
    // update
    email = await context
      .userGQL({
        query: gql`
          mutation updateEmail($email: updateEmailInput!) {
            updateEmail(input: $email) {
              email {
                id
              }
            }
          }
        `,
        variables: {
          email: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updateEmail.email);
  }
  return email;
}
