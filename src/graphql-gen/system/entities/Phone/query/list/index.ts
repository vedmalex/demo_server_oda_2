import PhonesEdge from './PhonesEdge';
import PhonesConnection from './PhonesConnection';
import phoneItems from './phoneItems';
import phones from './phones';
import PhoneSortOrder from './PhoneSortOrder';
import PhoneComplexFilter from './PhoneComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Phone.queries.list',
  items: [
    PhonesEdge,
    PhonesConnection,
    phoneItems,
    phones,
    PhoneSortOrder,
    PhoneComplexFilter,
  ],
});
