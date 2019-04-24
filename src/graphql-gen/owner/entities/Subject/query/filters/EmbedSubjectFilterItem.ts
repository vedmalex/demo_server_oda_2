import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedSubjectFilterItem {
      some: SubjectFilter
      none: SubjectFilter
      every: SubjectFilter
    }
  `,
});
