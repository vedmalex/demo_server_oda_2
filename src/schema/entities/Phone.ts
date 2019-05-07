export default {
  name: 'Phone',
  embedded:true,
  fields: {
    phoneNumber: {
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
    //     opposite: 'phones',
    //   },
    // },
  },
};
