import User from './User';
import Student from './Student';
import Curator from './Curator';
import Group from './Group';
import Person from './Person';
import SocialNetwork from './SocialNetwork';
import Email from './Email';
import Phone from './Phone';
import Meeting from './Meeting';
import StudentAttendance from './StudentAttendance';
import Course from './Course';
import Subject from './Subject';
import SubjectCourse from './SubjectCourse';
import { Schema } from 'oda-gen-common';

export default new Schema({
  name: 'System.entities',
  items: [
    User,
    Student,
    Curator,
    Group,
    Person,
    SocialNetwork,
    Email,
    Phone,
    Meeting,
    StudentAttendance,
    Course,
    Subject,
    SubjectCourse,
  ],
});
