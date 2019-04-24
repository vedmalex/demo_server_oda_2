import { Schema } from '../common';
import Date from './Date';
import eSOC from './eSOC';
import eSOF from './eSOF';
import ID from './ID';
import ImageSize from './ImageSize';
import _JSON from './JSON';
import MutationKind from './MutationKind';
import PageInfo from './PageInfo';
import WhereBoolean from './WhereBoolean';
import WhereDate from './WhereDate';
import WhereFloat from './WhereFloat';
import WhereID from './WhereID';
import WhereInt from './WhereInt';
import WhereJSON from './WhereJSON';
import WhereListOfStrings from './WhereListOfStrings';
import WhereMutationKind from './WhereMutationKind';
import WhereString from './WhereString';

export default new Schema({
  name: 'ExtraTypes',
  items: [
    Date,
    eSOC,
    eSOF,
    ID,
    ImageSize,
    _JSON,
    MutationKind,
    PageInfo,
    WhereBoolean,
    WhereDate,
    WhereFloat,
    WhereID,
    WhereInt,
    WhereJSON,
    WhereListOfStrings,
    WhereMutationKind,
    WhereString,
  ],
});
