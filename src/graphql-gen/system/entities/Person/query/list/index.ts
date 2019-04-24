import PeopleEdge from './PeopleEdge';
import PeopleConnection from './PeopleConnection';
import PersonHasManySocialNetworksConnection from './PersonHasManySocialNetworksConnection';
import PersonHasManySocialNetworksEdge from './PersonHasManySocialNetworksEdge';
import PersonHasManyPhonesConnection from './PersonHasManyPhonesConnection';
import PersonHasManyPhonesEdge from './PersonHasManyPhonesEdge';
import PersonHasManyEmailsConnection from './PersonHasManyEmailsConnection';
import PersonHasManyEmailsEdge from './PersonHasManyEmailsEdge';
import PersonHasManyAsStudentsConnection from './PersonHasManyAsStudentsConnection';
import PersonHasManyAsStudentsEdge from './PersonHasManyAsStudentsEdge';
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
    PersonHasManySocialNetworksConnection,
    PersonHasManySocialNetworksEdge,
    PersonHasManyPhonesConnection,
    PersonHasManyPhonesEdge,
    PersonHasManyEmailsConnection,
    PersonHasManyEmailsEdge,
    PersonHasManyAsStudentsConnection,
    PersonHasManyAsStudentsEdge,
    personItems,
    people,
    PersonSortOrder,
    PersonComplexFilter,
  ],
});
