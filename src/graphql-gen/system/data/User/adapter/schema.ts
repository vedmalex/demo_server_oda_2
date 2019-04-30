import mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $User = new mongoose.Schema(
    {},
    {
      collection: 'users',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $User.add({
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
    },
    isSystem: {
      type: Boolean,
    },
    enabled: {
      type: Boolean,
    },
  });

  if (args && !args.single) {
    args.schema.index(
      {
        _id: 1,
        [args.fieldName
          ? [args.fieldName(), 'userName'].join('.')
          : 'userName']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  } else {
    $User.index(
      {
        userName: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $User;
};
