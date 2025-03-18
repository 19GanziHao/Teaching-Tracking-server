interface Item {
  id: number;
  courseName: string;
  courseCode: string;
  semester: string;
  submissionDate: Date;
  department: string;
  assessmentRequirements: string;
}

export class PerformCourseVo {
  list: Item[];
  total: number;
}
