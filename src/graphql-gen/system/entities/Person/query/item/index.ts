import person from './person';
import personUniqueKeys from './personUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Person.queries.single',
  items: [person, personUniqueKeys],
});
