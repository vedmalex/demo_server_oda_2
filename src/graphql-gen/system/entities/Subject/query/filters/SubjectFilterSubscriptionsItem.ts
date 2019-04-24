import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SubjectFilterSubscriptionsItem {
      name: WhereString
      id: WhereID
    }
  `,
});
