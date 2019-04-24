import * as mongoose from 'mongoose';

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
  $StudentAttendance.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
  });
  $StudentAttendance.add({
    updateBy: {
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

  $StudentAttendance.index(
    {
      createdBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $StudentAttendance.index(
    {
      updateBy: 1,
    },
    {
      sparse: 1,
    },
  );

  $StudentAttendance.index(
    {
      createdAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $StudentAttendance.index(
    {
      updatedAt: 1,
    },
    {
      sparse: 1,
    },
  );

  $StudentAttendance.index(
    {
      removed: 1,
    },
    {
      sparse: 1,
    },
  );

  $StudentAttendance.index(
    {
      owner: 1,
    },
    {
      sparse: 1,
    },
  );

  return $StudentAttendance;
};
