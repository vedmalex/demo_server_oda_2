import email from './email';
import emailUniqueKeys from './emailUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Email.queries.single',
  items: [email, emailUniqueKeys],
});
