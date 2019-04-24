import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SubjectFilter {
      or: [SubjectFilterItem]
      and: [SubjectFilterItem]
      name: WhereString
      id: WhereID
    }
  `,
});
