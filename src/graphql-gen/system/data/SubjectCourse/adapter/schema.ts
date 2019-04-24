import * as mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $SubjectCourse = new mongoose.Schema(
    {},
    {
      collection: 'subjectcourses',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $SubjectCourse.add({
    description: {
      type: String,
    },
    subject: {
      type: String,
    },
    course: {
      type: String,
    },
    hours: {
      type: Number,
    },
    level: {
      type: String,
    },
  });

  $SubjectCourse.add({
    subjectLink: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $SubjectCourse.add({
    courseLink: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $SubjectCourse.index(
    {
      description: 1,
    },
    {
      sparse: 1,
    },
  );

  $SubjectCourse.index(
    {
      subject: 1,
    },
    {
      sparse: 1,
    },
  );

  $SubjectCourse.index(
    {
      course: 1,
    },
    {
      sparse: 1,
    },
  );

  return $SubjectCourse;
};
