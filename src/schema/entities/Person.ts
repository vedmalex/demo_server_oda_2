export default {
  name: 'Person',
  fields: {
    spiritualName: {
      identity: true,
      indexed: 'text',
    },
    fullName: {
      identity: true,
      indexed: 'text',
    },
    dateOfBirth: {
      type: 'Date',
    },
    ages: {
      type: 'Number',
      derived: true,
    },
    user: {
      indexed: true,
      relation: {
        belongsTo: 'User#',
      },
    },
    socialNetworks: {
      type: {
        type: 'entity',
        name: 'SocialNetwork',
        multiplicity: 'many'
      }
    },
    phones: {
      type: {
        type: 'entity',
        name: 'Phone',
        multiplicity: 'many'
      }
    },
    emails: {
      type: {
        type: 'entity',
        name: 'Email',
        multiplicity: 'many'
      }
    },
    asStudents: {
      relation: {
        hasMany: 'Student#person',
      },
    },
    asCurator: {
      relation: {
        hasOne: "Curator#person",
      }
    },
    specialNotes: {
      type: 'richText',
      indexed: true,
    }
  },
};
