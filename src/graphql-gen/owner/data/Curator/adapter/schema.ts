import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Curator = new mongoose.Schema(
    {},
    {
      collection: 'curators',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Curator.add({
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

  $Curator.add({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Curator.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Curator.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Curator.index(
    {
      person: 1,
    },
    {
      sparse: 1,
    },
  );

  $Curator.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Curator.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Curator.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Curator.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Curator.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Curator.index(
    {
      owner: 1,
    },
    {
      sparse: 1,
    },
  );

  return $Curator;
};
