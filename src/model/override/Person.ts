import { Type, RegisterConnectors } from '../../graphql-gen/system/common';

import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    extend type User {
      ages: Float
    }
  `,
  resolver: {
    ages: async (
      { _id: id, dateOfBirth }, // owner id
      args,
      context: { connectors: RegisterConnectors },
      info
    ) => {
      let dob = dateOfBirth ? new Date(dateOfBirth) : undefined;
      if (dob) {
        let now = new Date();
        let years = now.getFullYear() - dob.getFullYear();
        let months = now.getMonth() - dob.getMonth();
        let days = now.getDate() - dob.getDate();

        if (years >= 0 && (months < 0 || (months <= 0 && days < 0))) {
          years -= 1;
        }
        return years;
      }
    }
  }
});
