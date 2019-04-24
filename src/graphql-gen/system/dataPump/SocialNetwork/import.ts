export default {
  import: {
    queries: {
      SocialNetwork: {
        filter: `
          id
          createdAt
          updatedAt
          removed
          owner`,
        uploader: {
          findQuery: {
            id: 'SocialNetwork/findById.graphql',
          },
          // createQuery: 'SocialNetwork/create.graphql',
          // updateQuery: 'SocialNetwork/update.graphql',
          // dataPropName: 'socialNetwork',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
    relate: {
      SocialNetwork: {
        filter: `
          id
          createdBy
          updateBy`,
        uploader: {
          findQuery: {
            id: 'SocialNetwork/findById.graphql',
          },
          // createQuery: 'SocialNetwork/create.graphql',
          // updateQuery: 'SocialNetwork/update.graphql',
          // dataPropName: 'socialNetwork',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
          },
        },
      },
    },
  },
};
