import course from './course';
import courseUniqueKeys from './courseUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Course.queries.single',
  items: [course, courseUniqueKeys],
});
