import subject from './subject';
import subjectUniqueKeys from './subjectUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Subject.queries.single',
  items: [subject, subjectUniqueKeys],
});
