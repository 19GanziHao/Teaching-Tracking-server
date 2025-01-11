import { TextbookInfo } from './textbookInfo.entity';
import { HoursDistribution } from './hoursDistribution.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeacherInfo } from './teacherInfo.entity';
import { ClassInfo } from './classInfo.entity';

@Entity()
export class CourseProgress {
  /**
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 课程名称
   */
  @Column()
  courseName: string;

  /**
   * 课程编号
   */
  @Column()
  courseCode: string;

  /**
   * 学期
   */
  @Column()
  semester: string;

  /**
   * 填表日期
   */
  @Column()
  submissionDate: Date;

  /**
   * 系(学院)
   */
  @Column()
  department: string;

  /**
   * 课程考核说明及要求
   */
  @Column()
  assessmentRequirements: string;

  /**
   * 课程教师id 外键
   */
  @OneToOne(() => TeacherInfo)
  @JoinColumn({
    name: 'teacher_id',
  })
  teacherInfo: TeacherInfo;

  /**
   * 授课班级id 外键
   */
  @OneToOne(() => ClassInfo)
  @JoinColumn({
    name: 'class_id',
  })
  classInfo: ClassInfo;

  /**
   * 学时分配id 外键
   */
  @OneToOne(() => HoursDistribution)
  @JoinColumn({
    name: 'hours_id',
  })
  hoursDistribution: HoursDistribution;

  /**
   * 教材id 外键
   */
  @OneToOne(() => TextbookInfo)
  @JoinColumn({
    name: 'textbook_id',
  })
  textbookInfo: TextbookInfo;
}
