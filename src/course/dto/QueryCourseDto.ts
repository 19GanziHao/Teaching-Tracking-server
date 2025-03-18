export class queryCourseDto {
  /**
   * 用户id
   */
  userId: number;
  /**
   * 课程名称
   */
  courseName?: string;

  /**
   * 课程编号
   */
  courseCode?: string;

  /**
   * 学期
   */
  semester?: string;

  /**
   * 填表日期
   */
  submissionDate?: string;

  /**
   * 学院
   */
  department?: string;

  /**
   * 页码
   */
  pageNum: number;

  /**
   * 每页数量
   */
  pageSize: number;
}
