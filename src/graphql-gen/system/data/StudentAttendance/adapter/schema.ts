import mongoose from 'mongoose';

export default (args?: {
  schema: mongoose.Schema;
  fieldName: () => string;
  single?: boolean;
}) => {
  let $StudentAttendance = new mongoose.Schema(
    {},
    {
      collection: 'studentattendances',
      autoIndex: process.env.NODE_ENV !== 'production',
    },
  );

  $StudentAttendance.add({
    meeting: {
      type: String,
    },
    student: {
      type: String,
    },
    present: {
      type: Boolean,
      required: true,
    },
    specialNotes: {
      type: String,
    },
    superpuper: {
      type: String,
    },
  });

  $StudentAttendance.add({
    meetingLink: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $StudentAttendance.add({
    studentLink: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });

  $StudentAttendance.index(
    {
      meeting: 1,
    },
    {
      sparse: 1,
    },
  );

  $StudentAttendance.index(
    {
      student: 1,
    },
    {
      sparse: 1,
    },
  );

  return $StudentAttendance;
};
