import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseProgress } from './entity/courseProgress.entity';
import { TeacherInfo } from './entity/teacherInfo.entity';
import { ClassInfo } from './entity/classInfo.entity';
import { HoursDistribution } from './entity/hoursDistribution.entity';
import { TextbookInfo } from './entity/textbookInfo.entity';
import { teachingSchedule } from './entity/teachingSchedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CourseProgress,
      TeacherInfo,
      ClassInfo,
      HoursDistribution,
      TextbookInfo,
      teachingSchedule,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
