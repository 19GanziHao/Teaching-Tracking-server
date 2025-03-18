import { User } from 'src/user/entity/users.entity';

interface TeacherInfoVo {
  id?: number;
  teacherName?: string;
  title?: string;
  education?: string;
  degree?: string;
}
interface ClassInfoVo {
  id?: number;
  major?: string;
  grade?: string;
  className?: string;
  studentCount?: number;
}
interface HoursDistributionVo {
  id?: number;
  totalHours?: number;
  lectureHours?: number;
  labHours?: number;
  extracurricularHours?: number;
  otherHours?: number;
  hoursDistributionNotes?: string;
}

interface TextbookInfoVo {
  id?: number;
  textbookName?: string;
  author?: string;
  publisher?: string;
  referencesBooks?: string;
  publishDate?: Date;
}

interface TeachingScheduleVo {
  id?: number;
  calendarWeek?: string;
  theoreticalHours?: number;
  experimentalHours?: number;
  extracurricularHours?: number;
  teachingContent?: string;
  teachingMethods?: string;
  homeworkArrangement?: string;
  executionStatus?: string;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CourseVo {
  id?: number;
  courseName?: string;
  courseCode?: string;
  semester?: string;
  submissionDate?: Date;
  department?: string;
  assessmentRequirements?: string;
  teacherInfo?: TeacherInfoVo;
  classInfo?: ClassInfoVo;
  hoursDistribution?: HoursDistributionVo;
  textbookInfo?: TextbookInfoVo;
  teachingSchedule?: TeachingScheduleVo[];
  user?: User;
}
