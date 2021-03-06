import mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Course = new mongoose.Schema(
    {},
    {
      collection: 'courses',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Course.add({
    name: {
      type: String,
      required: true,
    },
  });

  if (args && !args.single) {
    args.schema.index(
      {
        _id: 1,
        [args.fieldName ? [args.fieldName(), 'name'].join('.') : 'name']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  } else {
    $Course.index(
      {
        name: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $Course;
};
