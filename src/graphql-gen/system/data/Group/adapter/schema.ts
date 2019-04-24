import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Group = new mongoose.Schema(
    {},
    {
      collection: 'groups',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Group.add({
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

  $Group.add({
    course: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Group.add({
    curator: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Group.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Group.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Group.index(
    {
      course: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
    {
      curator: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Group.index(
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
    $Group.index(
      {
        name: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $Group;
};
