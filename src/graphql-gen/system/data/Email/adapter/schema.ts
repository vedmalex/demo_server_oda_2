import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Email = new mongoose.Schema(
    {},
    {
      collection: 'emails',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Email.add({
    email: {
      type: String,
      required: true,
    },
    type: {
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

  $Email.add({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Email.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Email.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Email.index(
    {
      type: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
    {
      person: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Email.index(
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
        [args.fieldName ? [args.fieldName(), 'email'].join('.') : 'email']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  } else {
    $Email.index(
      {
        email: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $Email;
};
