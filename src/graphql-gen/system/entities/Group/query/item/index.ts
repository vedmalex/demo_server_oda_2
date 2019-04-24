import group from './group';
import groupUniqueKeys from './groupUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Group.queries.single',
  items: [group, groupUniqueKeys],
});
