import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    enum StudentAttendanceSortOrder {
      meetingAsc
      meetingDesc
      studentAsc
      studentDesc
      presentAsc
      presentDesc
      specialNotesAsc
      specialNotesDesc
      idAsc
      idDesc
      superpuperAsc
      superpuperDesc
    }
  `,
});
