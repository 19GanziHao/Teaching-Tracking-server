import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseDto } from './dto/course.dto';
import { queryCourseDto } from './dto/QueryCourseDto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  /**
   * 创建课程
   * @returns Promise<void>
   */
  @Post()
  createCourse(@Body() courseDto: CourseDto) {
    return this.courseService.createCourse(courseDto);
  }

  /**
   * 查询课程
   * @returns Promise<findCourseVo>
   */
  @Get()
  findCourseAll(@Query() query: queryCourseDto) {
    return this.courseService.findCourse(query);
  }

  @Get('/perform')
  performCourse() {
    return this.courseService.findCourseByPerform();
  }

  /**
   * 通过id查询课程
   * @returns Promise<CourseVo>
   */
  @Get(':id')
  findCourseById(@Param('id') id: number) {
    return this.courseService.findCourseById(id);
  }

  /**
   * 修改课程信息
   */
  @Put(':id')
  updateCourse(@Param('id') id: number, @Body() courseDto: CourseDto) {
    return this.courseService.updateCourse(id, courseDto);
  }

  /**
   * 删除课程
   */
  @Delete(':id')
  deleteCourse(@Param('id') id: number, @Body() userId: number) {
    return this.courseService.deleteCourse(id, userId);
  }
}
