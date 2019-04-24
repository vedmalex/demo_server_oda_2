import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedMeetingFilter {
      or: [EmbedMeetingFilterItem]
      and: [EmbedMeetingFilterItem]
      some: MeetingFilter
      none: MeetingFilter
      every: MeetingFilter
    }
  `,
});
