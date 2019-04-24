import { Type, RegisterConnectors } from '../../graphql-gen/system/common';

import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    extend type Curator {
      spiritualName: String
      fullName: String
    }
  `,
  resolver: {
    spiritualName: async (
      { _id: id, person: personId }, // owner id
      args,
      context: { connectors: RegisterConnectors },
      info
    ) => {
      let result;
      let person = await context.connectors.Person.findOneById(personId);
      if (person) {
        result = person.spiritualName;
        return result;
      }
    },
    fullName: async (
      { _id: id, person: personId }, // owner id
      args,
      context: { connectors: RegisterConnectors },
      info
    ) => {
      let result;
      let person = await context.connectors.Person.findOneById(personId);
      if (person) {
        result = person.fullName;
        return result;
      }
    }
  }
});
