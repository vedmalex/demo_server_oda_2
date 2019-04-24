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

  $Student.add({});

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

  return $Student;
};
