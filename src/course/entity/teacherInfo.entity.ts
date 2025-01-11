import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TeacherInfo {
  /**
   * 教师id 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 教师姓名
   */
  @Column()
  teacherName: string;

  /**
   * 主讲教师职称
   */
  @Column()
  title: string;

  /**
   * 主讲教师学历
   */
  @Column()
  education: string;

  /**
   * 主讲教师学位
   */
  @Column()
  degree: string;
}
