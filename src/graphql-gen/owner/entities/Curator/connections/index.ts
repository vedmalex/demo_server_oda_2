import { Schema } from '../../../common';

import addToCuratorBelongsToPerson from './addToCuratorBelongsToPerson';
import removeFromCuratorBelongsToPerson from './removeFromCuratorBelongsToPerson';
import addToCuratorHasManyGroups from './addToCuratorHasManyGroups';
import removeFromCuratorHasManyGroups from './removeFromCuratorHasManyGroups';
import addToCuratorBelongsToPersonInput from './addToCuratorBelongsToPersonInput';
import addToCuratorBelongsToPersonPayload from './addToCuratorBelongsToPersonPayload';
import removeFromCuratorBelongsToPersonInput from './removeFromCuratorBelongsToPersonInput';
import removeFromCuratorBelongsToPersonPayload from './removeFromCuratorBelongsToPersonPayload';
import addToCuratorHasManyGroupsInput from './addToCuratorHasManyGroupsInput';
import addToCuratorHasManyGroupsPayload from './addToCuratorHasManyGroupsPayload';
import removeFromCuratorHasManyGroupsInput from './removeFromCuratorHasManyGroupsInput';
import removeFromCuratorHasManyGroupsPayload from './removeFromCuratorHasManyGroupsPayload';

export default new Schema({
  name: 'Curator.connections',
  items: [
    addToCuratorBelongsToPerson,
    removeFromCuratorBelongsToPerson,
    addToCuratorHasManyGroups,
    removeFromCuratorHasManyGroups,
    addToCuratorBelongsToPersonInput,
    addToCuratorBelongsToPersonPayload,
    removeFromCuratorBelongsToPersonInput,
    removeFromCuratorBelongsToPersonPayload,
    addToCuratorHasManyGroupsInput,
    addToCuratorHasManyGroupsPayload,
    removeFromCuratorHasManyGroupsInput,
    removeFromCuratorHasManyGroupsPayload,
  ],
});
