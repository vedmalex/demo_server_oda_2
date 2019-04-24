import { Schema } from '../../common';
import gql from 'graphql-tag';
import mutation from './mutation';
import input from './input';
import payload from './payload';

export default new Schema({
  name: 'loginUser.mutation',
  items: [mutation, input, payload],
});
