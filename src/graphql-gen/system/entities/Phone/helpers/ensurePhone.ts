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
  } else if (args.phoneNumber) {
    fArgs = '$phoneNumber: String';
    filter = 'phoneNumber: $phoneNumber';
    variables = {
      phoneNumber: args.phoneNumber,
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
              phoneNumber: args.phoneNumber,
              type: args.type,
              person: args.person,
              id: args.id,
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
            phoneNumber: args.phoneNumber,
            type: args.type,
            person: args.person,
            id: args.id,
          },
        },
      })
      .then(r => r.data.updatePhone.phone);
  }
  return phone;
}
