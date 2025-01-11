import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TextbookInfo {
  /**
   * 教材id 主键
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * 教材名称
   */
  @Column()
  textbookName: string;

  /**
   * 教材编著者
   */
  @Column()
  author: string;

  /**
   * 教材出版社
   */
  @Column()
  publisher: string;

  /**
   * 主要参考书
   */
  @Column()
  referencesBooks: string;

  /**
   * 教材出版时间
   */
  @Column()
  publishDate: Date;
}
