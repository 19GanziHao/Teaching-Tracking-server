import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity()
export class Roles {
  /**s
   * 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 角色：教师、系主任....
   */
  @Column()
  name: string;

  /**
   * 角色描述
   */
  @Column()
  description: string;

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

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
