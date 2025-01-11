import { CourseProgress } from './courseProgress.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class teachingSchedule {
  /**
   * 教学计划表id 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 校历周次
   */
  @Column()
  calendarWeek: string;

  /**
   * 理论学时
   */
  @Column()
  theoreticalHours: number;

  /**
   * 实验学时
   */
  @Column()
  experimentalHours: number;

  /**
   * 课外学时
   */
  @Column()
  extracurricularHours: number;

  /**
   * 教学内容安排
   */
  @Column()
  teachingContent: string;

  /**
   * 教学形式及手段
   */
  @Column()
  teachingMethods: string;

  /**
   * 作业或辅导安排
   */
  @Column()
  homeworkArrangement: string;

  /**
   * 执行情况
   */
  @Column()
  executionStatus: string;

  /**
   * 备注
   */
  @Column()
  remarks: string;

  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * 课程进度表 id 外键
   */
  @OneToOne(() => CourseProgress)
  @JoinColumn({
    name: 'course_progress_id',
  })
  courseProgress: CourseProgress;
}
