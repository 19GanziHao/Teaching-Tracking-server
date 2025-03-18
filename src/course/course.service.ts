import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CourseDto } from './dto/course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseProgress } from './entity/courseProgress.entity';
import { Between, Like, Repository } from 'typeorm';
import { TeacherInfo } from './entity/teacherInfo.entity';
import { ClassInfo } from './entity/classInfo.entity';
import { HoursDistribution } from './entity/hoursDistribution.entity';
import { TextbookInfo } from './entity/textbookInfo.entity';
import { teachingSchedule } from './entity/teachingSchedule.entity';
import { queryCourseDto } from './dto/QueryCourseDto';
import { findCourseVo } from './vo/findCourseVo';
import { CourseVo } from './vo/courseVo';
import getWeekDates from 'src/utils/getWeekDates';
import { PerformCourseVo } from './vo/performCourseVo';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseProgress)
    private courseProgressRepository: Repository<CourseProgress>,
    @InjectRepository(TeacherInfo)
    private teacherInfoRepository: Repository<TeacherInfo>,
    @InjectRepository(ClassInfo)
    private classInfoRepository: Repository<ClassInfo>,
    @InjectRepository(HoursDistribution)
    private hoursDistributionRepository: Repository<HoursDistribution>,
    @InjectRepository(TextbookInfo)
    private textbookInfoRepository: Repository<TextbookInfo>,
    @InjectRepository(teachingSchedule)
    private teachingScheduleRepository: Repository<teachingSchedule>,
  ) {}

  /**
   * 创建课程进度表
   * @param courseDto CourseDto
   */
  async createCourse(courseDto: CourseDto) {
    // 1. 创建教师信息
    const teacherInfo = this.teacherInfoRepository.create(
      courseDto.teacherInfo,
    );
    await this.teacherInfoRepository.save(teacherInfo);

    // 2. 创建班级信息
    const classInfo = this.classInfoRepository.create(courseDto.classInfo);
    await this.classInfoRepository.save(classInfo);

    // 3. 创建学时分配信息
    const hoursDistribution = this.hoursDistributionRepository.create(
      courseDto.hoursDistribution,
    );
    await this.hoursDistributionRepository.save(hoursDistribution);

    // 4. 创建教材信息
    const textbookInfo = this.textbookInfoRepository.create(
      courseDto.textbookInfo,
    );
    await this.textbookInfoRepository.save(textbookInfo);

    // 5. 创建课程进度表
    const courseProgress = this.courseProgressRepository.create({
      courseName: courseDto.courseName,
      courseCode: courseDto.courseCode,
      semester: courseDto.semester,
      submissionDate: courseDto.submissionDate,
      department: courseDto.department,
      assessmentRequirements: courseDto.assessmentRequirements,
      teacherInfo,
      classInfo,
      hoursDistribution,
      textbookInfo,
      user: { id: courseDto.userId }, // 添加用户关联
    });
    await this.courseProgressRepository.save(courseProgress);

    // 6. 创建教学计划表
    for (let i = 0; i < courseDto.teachingSchedule.length; i++) {
      const teachingScheduleData = this.teachingScheduleRepository.create({
        ...courseDto.teachingSchedule[i],
        courseProgress,
      });
      await this.teachingScheduleRepository.save(teachingScheduleData);
    }
  }

  /**
   * 查询所有课程进度表
   */
  async findCourse(query: queryCourseDto): Promise<findCourseVo> {
    const { userId, ...rest } = query;
    const where = Object.keys(rest).reduce(
      (pre, cur: keyof queryCourseDto) => {
        // 排除分页参数，只对查询条件进行模糊匹配
        if (!(cur !== 'pageNum' && cur !== 'pageSize')) return pre;
        if (cur === 'submissionDate' && query[cur]) {
          const [startDate, endDate] = query[cur].split(',').map((i) => {
            const date = new Date(i);
            return new Date(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
            );
          });
          pre[cur] = Between(startDate, endDate);
          return pre;
        }
        if (cur === 'courseName') {
          pre[cur] = Like(`%${query[cur]}%`);
        } else {
          pre[cur] = query[cur];
        }
        return pre;
      },
      {
        user: { id: userId },
      } as Record<string, any>,
    );
    const [list, total] = await this.courseProgressRepository.findAndCount({
      where,
      skip: ((query.pageNum || 1) - 1) * (query.pageSize || 10), // 偏移 offset
      take: query.pageSize || 10, // limit 每页数量
      order: {
        submissionDate: 'DESC',
      },
    });

    return {
      list,
      total,
      pageSize: query.pageSize || 10,
      pageNum: query.pageNum || 1,
    };
  }

  /**
   * 查询正在进行中的课程 (这周内)
   */
  async findCourseByPerform(): Promise<PerformCourseVo> {
    const { monday, sunday } = getWeekDates();
    const [list, total] = await this.teachingScheduleRepository.findAndCount({
      where: {
        weekTime: Between(monday, sunday),
      },
      relations: {
        courseProgress: true,
      },
    });

    return {
      list: list.map((i) => i.courseProgress),
      total,
    };
  }

  /**
   *  通过id查询课程
   * @param id number
   */
  async findCourseById(id: number): Promise<CourseVo> {
    const course = await this.courseProgressRepository.findOne({
      where: { id },
      relations: {
        teacherInfo: true,
        classInfo: true,
        hoursDistribution: true,
        textbookInfo: true,
      },
    });
    if (!course) {
      throw new NotFoundException('课程不存在');
    }

    // 单独查询教学计划表
    const schedules = await this.teachingScheduleRepository.find({
      where: {
        courseProgress: { id },
      },
      order: {
        // calendarWeek: 'ASC',
      },
    });
    return {
      ...course,
      teachingSchedule: schedules,
    };
  }

  /**
   * 修改课程信息
   * @param id 课程ID
   * @param courseDto 课程信息
   */
  async updateCourse(id: number, courseDto: CourseDto) {
    // 查询课程是否存在
    const course = await this.courseProgressRepository.findOne({
      where: { id },
      relations: {
        teacherInfo: true,
        classInfo: true,
        hoursDistribution: true,
        textbookInfo: true,
      },
    });

    if (!course) {
      throw new NotFoundException('课程不存在');
    }

    // 更新教师信息
    await this.teacherInfoRepository.update(
      course.teacherInfo.id,
      courseDto.teacherInfo,
    );

    // 更新班级信息
    await this.classInfoRepository.update(
      course.classInfo.id,
      courseDto.classInfo,
    );

    // 更新学时分配
    await this.hoursDistributionRepository.update(
      course.hoursDistribution.id,
      courseDto.hoursDistribution,
    );

    // 更新教材信息
    await this.textbookInfoRepository.update(
      course.textbookInfo.id,
      courseDto.textbookInfo,
    );

    // 更新课程主表信息
    await this.courseProgressRepository.update(id, {
      courseName: courseDto.courseName,
      courseCode: courseDto.courseCode,
      semester: courseDto.semester,
      submissionDate: courseDto.submissionDate,
      department: courseDto.department,
      assessmentRequirements: courseDto.assessmentRequirements,
    });

    // 删除原有教学计划
    await this.teachingScheduleRepository.delete({
      courseProgress: { id },
    });

    // 创建新的教学计划 为了保证每次插入到数据库的顺序是一样的 所以用for循环
    for (let i = 0; i < courseDto.teachingSchedule.length; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, createdAt, updatedAt, ...scheduleData } =
        courseDto.teachingSchedule[i];
      console.log(scheduleData);
      const teachingScheduleData = this.teachingScheduleRepository.create({
        ...scheduleData,
        courseProgress: course,
      });
      await this.teachingScheduleRepository.save(teachingScheduleData);
    }
  }

  /**
   * 删除课程
   * @param id number
   * @param userId number
   */
  async deleteCourse(id: number, userId: number) {
    const course = await this.findCourseById(id);
    if (!course) {
      throw new NotFoundException('课程不存在');
    }
    // 验证用户权限
    if (course?.user?.id !== userId) {
      throw new ForbiddenException('无权限删除此课程');
    }
    await this.courseProgressRepository.delete(id);
    // 删除关联数据
    await this.teacherInfoRepository.delete(course?.teacherInfo?.id as number);
    await this.classInfoRepository.delete(course?.classInfo?.id as number);
    await this.hoursDistributionRepository.delete(
      course?.hoursDistribution?.id as number,
    );
    await this.textbookInfoRepository.delete(
      course?.textbookInfo?.id as number,
    );
    await this.teachingScheduleRepository.delete({ courseProgress: { id } });
  }
}
