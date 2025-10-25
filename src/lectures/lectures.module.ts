import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LecturesService } from './lectures.service';
import { LecturesController } from './lectures.controller';
import { Lecture, LectureSchema } from './schemas/lecture.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Lecture.name, schema: LectureSchema }])],
  controllers: [LecturesController],
  providers: [LecturesService],
  exports: [LecturesService],
})
export class LecturesModule {}