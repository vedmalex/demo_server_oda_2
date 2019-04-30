import mongoose from 'mongoose';

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

  $Curator.add({});

  $Curator.add({
    person: {
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

  return $Curator;
};
