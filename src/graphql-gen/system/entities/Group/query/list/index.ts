import GroupsEdge from './GroupsEdge';
import GroupsConnection from './GroupsConnection';
import groupItems from './groupItems';
import groups from './groups';
import GroupSortOrder from './GroupSortOrder';
import GroupComplexFilter from './GroupComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Group.queries.list',
  items: [
    GroupsEdge,
    GroupsConnection,
    groupItems,
    groups,
    GroupSortOrder,
    GroupComplexFilter,
  ],
});
