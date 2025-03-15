export class CourseDto {
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

  /**
   * 课程考核说明及要求
   */
  assessmentRequirements: string;

  /**
   * 教师信息
   */
  teacherInfo: {
    /**
     * 教师姓名
     */
    teacherName: string;
    /**
     * 主讲教师职称
     */
    title: string;
    /**
     * 主讲教师学历
     */
    education: string;
    /**
     * 主讲教师学位
     */
    degree: string;
  };

  /**
   * 班级信息
   */
  classInfo: {
    /**
     * 授课对象专业
     */
    major: string;
    /**
     * 授课对象年级
     */
    grade: string;
    /**
     * 授课对象班级
     */
    className: string;
    /**
     * 授课对象人数
     */
    studentCount: number;
  };

  /**
   * 学时分配
   */
  hoursDistribution: {
    /**
     * 总学时
     */
    totalHours: number;
    /**
     * 授课学时
     */
    lectureHours: number;
    /**
     * 实验学时
     */
    labHours: number;
    /**
     * 课外学时
     */
    extracurricularHours: number;
    /**
     * 其他学时
     */
    otherHours: number;
    /**
     * 学时分配说明
     */
    hoursDistributionNotes: string;
  };

  /**
   * 教材信息
   */
  textbookInfo: {
    /**
     * 教材名称
     */
    textbookName: string;
    /**
     * 教材编著者
     */
    author: string;
    /**
     * 教材出版社
     */
    publisher: string;
    /**
     * 主要参考书
     */
    referencesBooks: string;
    /**
     * 教材出版时间
     */
    publishDate: Date;
  };

  /**
   * 教学计划表
   */
  teachingSchedule: {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    /**
     * 校历周次
     */
    calendarWeek: string;
    /**
     * 理论学时
     */
    theoreticalHours: number;
    /**
     * 实验学时
     */
    experimentalHours: number;
    /**
     * 课外学时
     */
    extracurricularHours: number;
    /**
     * 教学内容安排
     */
    teachingContent: string;
    /**
     * 教学形式及手段
     */
    teachingMethods: string;
    /**
     * 作业或辅导安排
     */
    homeworkArrangement: string;
    /**
     * 执行情况
     */
    executionStatus: string;
    /**
     * 备注
     */
    remarks: string;
  }[];
}
