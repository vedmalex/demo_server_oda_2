import phone from './phone';
import phoneUniqueKeys from './phoneUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Phone.queries.single',
  items: [phone, phoneUniqueKeys],
});
