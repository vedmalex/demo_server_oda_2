export default {
  import: {
    queries: {
      SocialNetwork: {
        filter: `
          id
          account
          url
          type`,
        uploader: {
          findQuery: {
            id: 'SocialNetwork/findById.graphql',
            account: 'SocialNetwork/findByAccount.graphql',
          },
          // createQuery: 'SocialNetwork/create.graphql',
          // updateQuery: 'SocialNetwork/update.graphql',
          // dataPropName: 'socialNetwork',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            account: f =>
              f.hasOwnProperty('account') ? { account: f.account } : null,
          },
        },
      },
    },
    relate: {
      SocialNetwork: {
        filter: `
          id
          person`,
        uploader: {
          findQuery: {
            id: 'SocialNetwork/findById.graphql',
            account: 'SocialNetwork/findByAccount.graphql',
          },
          // createQuery: 'SocialNetwork/create.graphql',
          // updateQuery: 'SocialNetwork/update.graphql',
          // dataPropName: 'socialNetwork',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            account: f =>
              f.hasOwnProperty('account') ? { account: f.account } : null,
          },
        },
      },
    },
  },
};
