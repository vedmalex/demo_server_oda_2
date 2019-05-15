import User from './User/adapter/connector';
import { UserConnector } from './User/adapter/interface';

import Student from './Student/adapter/connector';
import { StudentConnector } from './Student/adapter/interface';

import Curator from './Curator/adapter/connector';
import { CuratorConnector } from './Curator/adapter/interface';

import Group from './Group/adapter/connector';
import { GroupConnector } from './Group/adapter/interface';

import Person from './Person/adapter/connector';
import { PersonConnector } from './Person/adapter/interface';

import SocialNetwork from './SocialNetwork/adapter/connector';
import { SocialNetworkConnector } from './SocialNetwork/adapter/interface';

import Email from './Email/adapter/connector';
import { EmailConnector } from './Email/adapter/interface';

import Phone from './Phone/adapter/connector';
import { PhoneConnector } from './Phone/adapter/interface';

import Meeting from './Meeting/adapter/connector';
import { MeetingConnector } from './Meeting/adapter/interface';

import StudentAttendance from './StudentAttendance/adapter/connector';
import { StudentAttendanceConnector } from './StudentAttendance/adapter/interface';

import Course from './Course/adapter/connector';
import { CourseConnector } from './Course/adapter/interface';

import Subject from './Subject/adapter/connector';
import { SubjectConnector } from './Subject/adapter/interface';

import SubjectCourse from './SubjectCourse/adapter/connector';
import { SubjectCourseConnector } from './SubjectCourse/adapter/interface';

import { acl, ACLCheck, SecurityContext } from 'oda-api-graphql';

import { RegisterConnectorsBase } from 'oda-api-graphql';

export default class RegisterConnectors extends RegisterConnectorsBase {
  public get User(): UserConnector {
    return this.InitUser();
  }

  public InitUser(): UserConnector {
    if (!this._User) {
      this._User = new User({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._User;
  }

  public get Student(): StudentConnector {
    return this.InitStudent();
  }

  public InitStudent(): StudentConnector {
    if (!this._Student) {
      this._Student = new Student({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Student;
  }

  public get Curator(): CuratorConnector {
    return this.InitCurator();
  }

  public InitCurator(): CuratorConnector {
    if (!this._Curator) {
      this._Curator = new Curator({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Curator;
  }

  public get Group(): GroupConnector {
    return this.InitGroup();
  }

  public InitGroup(): GroupConnector {
    if (!this._Group) {
      this._Group = new Group({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Group;
  }

  public get Person(): PersonConnector {
    return this.InitPerson();
  }

  public InitPerson(): PersonConnector {
    if (!this._Person) {
      this._Person = new Person({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Person;
  }

  public get SocialNetwork(): SocialNetworkConnector {
    return this.InitSocialNetwork();
  }

  public InitSocialNetwork(): SocialNetworkConnector {
    if (!this._SocialNetwork) {
      this._SocialNetwork = new SocialNetwork({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._SocialNetwork;
  }

  public get Email(): EmailConnector {
    return this.InitEmail();
  }

  public InitEmail(): EmailConnector {
    if (!this._Email) {
      this._Email = new Email({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Email;
  }

  public get Phone(): PhoneConnector {
    return this.InitPhone();
  }

  public InitPhone(): PhoneConnector {
    if (!this._Phone) {
      this._Phone = new Phone({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Phone;
  }

  public get Meeting(): MeetingConnector {
    return this.InitMeeting();
  }

  public InitMeeting(): MeetingConnector {
    if (!this._Meeting) {
      this._Meeting = new Meeting({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Meeting;
  }

  public get StudentAttendance(): StudentAttendanceConnector {
    return this.InitStudentAttendance();
  }

  public InitStudentAttendance(): StudentAttendanceConnector {
    if (!this._StudentAttendance) {
      this._StudentAttendance = new StudentAttendance({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._StudentAttendance;
  }

  public get Course(): CourseConnector {
    return this.InitCourse();
  }

  public InitCourse(): CourseConnector {
    if (!this._Course) {
      this._Course = new Course({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Course;
  }

  public get Subject(): SubjectConnector {
    return this.InitSubject();
  }

  public InitSubject(): SubjectConnector {
    if (!this._Subject) {
      this._Subject = new Subject({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._Subject;
  }

  public get SubjectCourse(): SubjectCourseConnector {
    return this.InitSubjectCourse();
  }

  public InitSubjectCourse(): SubjectCourseConnector {
    if (!this._SubjectCourse) {
      this._SubjectCourse = new SubjectCourse({
        mongoose: this.mongoose,
        connectors: this,
        securityContext: this.securityContext,
      });
    }
    return this._SubjectCourse;
  }

  protected _User: UserConnector;
  protected _Student: StudentConnector;
  protected _Curator: CuratorConnector;
  protected _Group: GroupConnector;
  protected _Person: PersonConnector;
  protected _SocialNetwork: SocialNetworkConnector;
  protected _Email: EmailConnector;
  protected _Phone: PhoneConnector;
  protected _Meeting: MeetingConnector;
  protected _StudentAttendance: StudentAttendanceConnector;
  protected _Course: CourseConnector;
  protected _Subject: SubjectConnector;
  protected _SubjectCourse: SubjectCourseConnector;

  public userGQL;
  public systemGQL;

  public securityContext: SecurityContext<RegisterConnectors>;

  public initGQL({ userGQL, systemGQL }: { userGQL?; systemGQL? }) {
    this.userGQL = userGQL ? userGQL : this.userGQL;
    this.systemGQL = systemGQL ? systemGQL : this.systemGQL;
  }

  protected _defaultAccess(
    context,
    obj: {
      source?: any;
      payload?: any;
    },
  ): object {
    let result = obj.source;
    return result;
  }

  protected _defaultCreate(
    context,
    obj: {
      source?: any;
      payload?: any;
    },
  ): object {
    let result = obj.payload;
    return result;
  }

  constructor({
    user,
    owner,
    mongoose,
    sequelize,
    acls,
    userGroup,
    userGQL,
    systemGQL,
  }: {
    user?: any;
    owner?: any;
    mongoose?: any;
    sequelize?: any;
    acls?: {
      read?: acl.secureAny.Acls<ACLCheck>;
      update?: acl.secureAny.Acls<ACLCheck>;
      create?: acl.secureAny.Acls<ACLCheck>;
      remove?: acl.secureAny.Acls<ACLCheck>;
    };
    userGroup?: string;
    userGQL?;
    systemGQL?;
  }) {
    super();
    this.securityContext = {
      user,
      group: userGroup,
      acls: {
        read: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.read,
              }
            : {
                '*': this._defaultAccess,
              },
        }),
        update: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.update,
              }
            : {
                '*': this._defaultAccess,
              },
        }),
        create: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultCreate,
                ...acls.create,
              }
            : {
                '*': this._defaultCreate,
              },
        }),
        remove: new acl.secureAny.Secure<ACLCheck>({
          acls: acls
            ? {
                '*': this._defaultAccess,
                ...acls.remove,
              }
            : {
                '*': this._defaultAccess,
              },
        }),
      },
    };
    this.mongoose = mongoose;
    this.sequelize = sequelize;
    this.initGQL({ userGQL, systemGQL });
  }

  async syncDb(force: boolean = false) {}

  async close() {
    if (this.sequelize && typeof this.sequelize.close === 'function') {
      await this.sequelize.close();
    }
    if (this.mongoose && typeof this.mongoose.close === 'function') {
      await this.mongoose.close();
    }
  }
}
