import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Person = new mongoose.Schema(
    {},
    {
      collection: 'people',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Person.add({
    spiritualName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    specialNotes: {
      type: String,
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

  $Person.add({
    user: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Person.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Person.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Person.index(
    {
      spiritualName: 'text',
      fullName: 'text',
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      user: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      specialNotes: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Person.index(
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
        [args.fieldName
          ? [args.fieldName(), 'spiritualName'].join('.')
          : 'spiritualName']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );

    args.schema.index(
      {
        _id: 1,
        [args.fieldName
          ? [args.fieldName(), 'fullName'].join('.')
          : 'fullName']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  } else {
    $Person.index(
      {
        spiritualName: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );

    $Person.index(
      {
        fullName: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $Person;
};
