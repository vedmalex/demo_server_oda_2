import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Subject = new mongoose.Schema(
    {},
    {
      collection: 'subjects',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Subject.add({
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

  $Subject.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Subject.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Subject.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Subject.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Subject.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Subject.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Subject.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Subject.index(
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
    $Subject.index(
      {
        name: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $Subject;
};
