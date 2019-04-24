import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input MeetingFilterSubscriptionsItem {
      date: WhereDate
      curator: WhereID
      group: WhereID
      id: WhereID
    }
  `,
});
