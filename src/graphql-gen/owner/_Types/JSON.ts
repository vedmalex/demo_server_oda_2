import { Kind } from 'graphql';
import { Scalar } from '../common';
import gql from 'graphql-tag';

export default new Scalar({
  schema: gql`
    scalar JSON
  `,
  resolver: {
    serialize: identity,
    parseValue: identity,
    parseLiteral: parseLiteral,
  },
});

function identity(value) {
  return value;
}

function parseLiteral(ast) {
  let result;
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      result = ast.value;
      break;
    case Kind.INT:
    case Kind.FLOAT:
      result = parseFloat(ast.value);
      break;
    case Kind.OBJECT:
      const value = Object.create(null);
      ast.fields.forEach(field => {
        value[field.name.value] = parseLiteral(field.value);
      });
      result = value;
      break;
    case Kind.LIST:
      result = ast.values.map(parseLiteral);
      break;
    default:
      result = null;
      break;
  }
  return result;
}
