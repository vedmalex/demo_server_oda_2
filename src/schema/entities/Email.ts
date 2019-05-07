export default {
  name: 'Email',
  embedded:true,
  fields: {
    email: {
      identity: true,
    },
    type: {
      indexed: true,
      type: 'CommunicationType',
    },
    // person: {
    //   indexed: true,
    //   relation: {
    //     belongsTo: 'Person#',
    //     opposite: 'emails',
    //   },
    // },
  },
};
