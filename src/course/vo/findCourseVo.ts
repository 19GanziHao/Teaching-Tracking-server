interface list {
  /**
   * 课程ID
   */
  id: number;

  /**
   * 课程名称
   */
  courseName: string;

  /**
   * 课程编号
   */
  courseCode: string;

  /**
   * 学期
   */
  semester: string;

  /**
   * 填表日期
   */
  submissionDate: Date;

  /**
   * 系(学院)
   */
  department: string;
}

export class findCourseVo {
  /**
   * 总数
   */
  total: number;

  /**
   * 列表
   */
  list: list[];

  /**
   * 页码
   */
  pageSize: number;

  /**
   * 页数
   */
  pageNum: number;
}
