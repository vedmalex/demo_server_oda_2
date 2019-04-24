export default {
  import: {
    queries: {
      Phone: {
        filter: `
          id
          phoneNumber
          type`,
        uploader: {
          findQuery: {
            id: 'Phone/findById.graphql',
            phoneNumber: 'Phone/findByPhoneNumber.graphql',
          },
          // createQuery: 'Phone/create.graphql',
          // updateQuery: 'Phone/update.graphql',
          // dataPropName: 'phone',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            phoneNumber: f =>
              f.hasOwnProperty('phoneNumber')
                ? { phoneNumber: f.phoneNumber }
                : null,
          },
        },
      },
    },
    relate: {
      Phone: {
        filter: `
          id
          person`,
        uploader: {
          findQuery: {
            id: 'Phone/findById.graphql',
            phoneNumber: 'Phone/findByPhoneNumber.graphql',
          },
          // createQuery: 'Phone/create.graphql',
          // updateQuery: 'Phone/update.graphql',
          // dataPropName: 'phone',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            phoneNumber: f =>
              f.hasOwnProperty('phoneNumber')
                ? { phoneNumber: f.phoneNumber }
                : null,
          },
        },
      },
    },
  },
};
