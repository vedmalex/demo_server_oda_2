import mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Meeting = new mongoose.Schema(
    {},
    {
      collection: 'meetings',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Meeting.add({
    date: {
      type: Date,
    },
  });

  $Meeting.add({
    curator: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Meeting.add({
    group: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Meeting.index(
    {
      curator: 1,
    },
    {
      sparse: 1,
    },
  );

  $Meeting.index(
    {
      group: 1,
    },
    {
      sparse: 1,
    },
  );

  return $Meeting;
};
