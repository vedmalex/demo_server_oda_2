import gql from 'graphql-tag';

export default async function ensurePhone({ args, context, create }) {
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
  let phone;
  if (filter) {
    phone = await context
      .userGQL({
        query: gql`query findPhone(${fArgs}){
            phone(${filter}){
              id
            }
          }
          `,
        variables,
      })
      .then(r => r.data.phone);
  }

  if (!phone) {
    if (create) {
      phone = await context
        .userGQL({
          query: gql`
            mutation createPhone($phone: createPhoneInput!) {
              createPhone(input: $phone) {
                phone {
                  node {
                    id
                  }
                }
              }
            }
          `,
          variables: {
            phone: {
              createdBy: args.createdBy,
              updateBy: args.updateBy,
              createdAt: args.createdAt,
              updatedAt: args.updatedAt,
              removed: args.removed,
              owner: args.owner,
            },
          },
        })
        .then(r => r.data.createPhone.phone.node);
    }
  } else {
    // update
    phone = await context
      .userGQL({
        query: gql`
          mutation updatePhone($phone: updatePhoneInput!) {
            updatePhone(input: $phone) {
              phone {
                id
              }
            }
          }
        `,
        variables: {
          phone: {
            createdBy: args.createdBy,
            updateBy: args.updateBy,
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            removed: args.removed,
            owner: args.owner,
          },
        },
      })
      .then(r => r.data.updatePhone.phone);
  }
  return phone;
}
