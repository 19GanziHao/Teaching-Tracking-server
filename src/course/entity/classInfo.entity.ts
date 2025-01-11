import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClassInfo {
  /**
   * 授课对象（班级）id 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 授课对象专业
   */
  @Column()
  major: string;

  /**
   * 授课对象年级
   */
  @Column()
  grade: string;

  /**
   * 授课对象班级
   */
  @Column()
  className: string;

  /**
   * 授课对象人数
   */
  @Column()
  studentCount: number;
}
