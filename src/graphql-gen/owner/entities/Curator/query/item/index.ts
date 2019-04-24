import curator from './curator';
import curatorUniqueKeys from './curatorUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Curator.queries.single',
  items: [curator, curatorUniqueKeys],
});
