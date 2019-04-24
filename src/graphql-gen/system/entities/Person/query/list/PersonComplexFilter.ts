import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input PersonComplexFilter {
      or: [PersonComplexFilter]
      and: [PersonComplexFilter]
      spiritualName: WhereString
      fullName: WhereString
      dateOfBirth: WhereDate
      ages: WhereFloat
      user: WhereID
      specialNotes: WhereString
      id: WhereID
    }
  `,
});
