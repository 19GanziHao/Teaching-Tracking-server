import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HoursDistribution {
  /**
   * 学时id 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 总学时
   */
  @Column()
  totalHours: number;

  /**
   * 授课学时
   */
  @Column()
  lectureHours: number;

  /**
   * 实验学时
   */
  @Column()
  labHours: number;

  /**
   * 课外学时
   */
  @Column()
  extracurricularHours: number;

  /**
   * 其他学时
   */
  @Column()
  otherHours: number;

  /**
   * 学时分配说明
   */
  @Column()
  hoursDistributionNotes: string;
}
