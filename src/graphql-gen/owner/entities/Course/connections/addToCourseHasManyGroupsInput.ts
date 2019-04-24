import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToCourseHasManyGroupsInput {
      course: ID!
      group: ID!
      #additional Edge fields
    }
  `,
});
