import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $Student = new mongoose.Schema(
    {},
    {
      collection: 'students',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $Student.add({
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

  $Student.add({
    person: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Student.add({
    group: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Student.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $Student.add({
    updateBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $Student.index(
    {
      person: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      group: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $Student.index(
    {
      owner: 1,
    },
    {
      sparse: 1,
    },
  );

  return $Student;
};
