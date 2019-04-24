import CuratorsEdge from './CuratorsEdge';
import CuratorsConnection from './CuratorsConnection';
import CuratorHasManyGroupsConnection from './CuratorHasManyGroupsConnection';
import CuratorHasManyGroupsEdge from './CuratorHasManyGroupsEdge';
import curatorItems from './curatorItems';
import curators from './curators';
import CuratorSortOrder from './CuratorSortOrder';
import CuratorComplexFilter from './CuratorComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Curator.queries.list',
  items: [
    CuratorsEdge,
    CuratorsConnection,
    CuratorHasManyGroupsConnection,
    CuratorHasManyGroupsEdge,
    curatorItems,
    curators,
    CuratorSortOrder,
    CuratorComplexFilter,
  ],
});
