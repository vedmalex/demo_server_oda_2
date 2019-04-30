import mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $SocialNetwork = new mongoose.Schema(
    {},
    {
      collection: 'socialnetworks',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $SocialNetwork.add({
    account: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    type: {
      type: String,
    },
  });

  $SocialNetwork.add({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $SocialNetwork.index(
    {
      url: 1,
    },
    {
      sparse: 1,
    },
  );

  $SocialNetwork.index(
    {
      type: 1,
    },
    {
      sparse: 1,
    },
  );

  $SocialNetwork.index(
    {
      person: 1,
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
          ? [args.fieldName(), 'account'].join('.')
          : 'account']: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  } else {
    $SocialNetwork.index(
      {
        account: 1,
      },
      {
        sparse: 1,
        unique: 1,
      },
    );
  }

  return $SocialNetwork;
};
