import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Phone = new mongoose.Schema(
    {},
    {
      collection: 'phones',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Phone.add({
    phoneNumber: {
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

  $Phone.add({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Phone.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Phone.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Phone.index(
    {
      type: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
    {
      person: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Phone.index(
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
          ? [args.fieldName(), 'phoneNumber'].join('.')
          : 'phoneNumber']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  } else {
    $Phone.index(
      {
        phoneNumber: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $Phone;
};
