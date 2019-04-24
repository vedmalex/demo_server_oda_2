export default {
  import: {
    queries: {
      Person: {
        filter: `
          id
          spiritualName
          fullName
          dateOfBirth
          specialNotes`,
        uploader: {
          findQuery: {
            id: 'Person/findById.graphql',
            spiritualName: 'Person/findBySpiritualName.graphql',
            fullName: 'Person/findByFullName.graphql',
          },
          // createQuery: 'Person/create.graphql',
          // updateQuery: 'Person/update.graphql',
          // dataPropName: 'person',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            spiritualName: f =>
              f.hasOwnProperty('spiritualName')
                ? { spiritualName: f.spiritualName }
                : null,
            fullName: f =>
              f.hasOwnProperty('fullName') ? { fullName: f.fullName } : null,
          },
        },
      },
    },
    relate: {
      Person: {
        filter: `
          id
          user
          socialNetworks
          phones
          emails
          asStudents
          asCurator`,
        uploader: {
          findQuery: {
            id: 'Person/findById.graphql',
            spiritualName: 'Person/findBySpiritualName.graphql',
            fullName: 'Person/findByFullName.graphql',
          },
          // createQuery: 'Person/create.graphql',
          // updateQuery: 'Person/update.graphql',
          // dataPropName: 'person',
          findVars: {
            id: f => (f.hasOwnProperty('id') ? { id: f.id } : null),
            spiritualName: f =>
              f.hasOwnProperty('spiritualName')
                ? { spiritualName: f.spiritualName }
                : null,
            fullName: f =>
              f.hasOwnProperty('fullName') ? { fullName: f.fullName } : null,
          },
        },
      },
    },
  },
};
