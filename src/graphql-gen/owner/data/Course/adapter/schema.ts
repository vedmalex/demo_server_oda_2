import * as mongoose from 'mongoose';

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
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    removed: {
      type: Boolean,
    },
    owner: {
      type: String,
    },
  });

  $Course.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Course.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Course.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Course.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Course.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Course.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Course.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Course.index(
    {
      owner: 1,
    },
    {
      sparse: 1,
    },
  );

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
