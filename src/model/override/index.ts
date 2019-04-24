import PersonEntity from './Person';
import CuratorEntity from './Curator';
import { Schema } from '../../graphql-gen/system/common';

export default new Schema({
  name: 'overrides.derived',
  items: [PersonEntity, CuratorEntity]
});
