import EmailsEdge from './EmailsEdge';
import EmailsConnection from './EmailsConnection';
import emailItems from './emailItems';
import emails from './emails';
import EmailSortOrder from './EmailSortOrder';
import EmailComplexFilter from './EmailComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Email.queries.list',
  items: [
    EmailsEdge,
    EmailsConnection,
    emailItems,
    emails,
    EmailSortOrder,
    EmailComplexFilter,
  ],
});
