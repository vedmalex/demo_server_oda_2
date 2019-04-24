export default {
  name: 'SocialNetwork',
  fields: {
    account: {
      identity: true,
    },
    url: {
      indexed: true,
    },
    type: {
      indexed: true,
      type: 'SocialNetworkType',
    },
    person: {
      indexed: true,
      relation: {
        belongsTo: 'Person#',
        opposite: 'socialNetworks',
      },
    },
  },
};
