import * as mongoose from 'mongoose';

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
  $Meeting.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Meeting.add({
    updateBy: {
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

  $Meeting.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Meeting.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Meeting.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Meeting.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Meeting.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Meeting.index(
    {
      owner: 1,
    },
    {
      sparse: 1,
    },
  );

  return $Meeting;
};
