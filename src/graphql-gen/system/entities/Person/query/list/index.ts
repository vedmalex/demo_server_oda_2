import PeopleEdge from './PeopleEdge';
import PeopleConnection from './PeopleConnection';
import personItems from './personItems';
import people from './people';
import PersonSortOrder from './PersonSortOrder';
import PersonComplexFilter from './PersonComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Person.queries.list',
  items: [
    PeopleEdge,
    PeopleConnection,
    personItems,
    people,
    PersonSortOrder,
    PersonComplexFilter,
  ],
});
