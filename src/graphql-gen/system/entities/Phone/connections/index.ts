import { Schema } from '../../../common';

import addToPhoneBelongsToPerson from './addToPhoneBelongsToPerson';
import removeFromPhoneBelongsToPerson from './removeFromPhoneBelongsToPerson';
import addToPhoneBelongsToPersonInput from './addToPhoneBelongsToPersonInput';
import addToPhoneBelongsToPersonPayload from './addToPhoneBelongsToPersonPayload';
import removeFromPhoneBelongsToPersonInput from './removeFromPhoneBelongsToPersonInput';
import removeFromPhoneBelongsToPersonPayload from './removeFromPhoneBelongsToPersonPayload';

export default new Schema({
  name: 'Phone.connections',
  items: [
    addToPhoneBelongsToPerson,
    removeFromPhoneBelongsToPerson,
    addToPhoneBelongsToPersonInput,
    addToPhoneBelongsToPersonPayload,
    removeFromPhoneBelongsToPersonInput,
    removeFromPhoneBelongsToPersonPayload,
  ],
});
