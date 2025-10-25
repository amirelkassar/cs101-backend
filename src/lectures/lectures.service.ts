import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';

@Injectable()
export class LecturesService {
  constructor(@InjectModel(Lecture.name) private lectureModel: Model<LectureDocument>) {}

  async findAll(): Promise<Lecture[]> {
    return this.lectureModel.find().sort({ order: 1 }).lean();
  }

  async create(data: Partial<Lecture>): Promise<Lecture> {
    const created = await this.lectureModel.create(data);
    return created.toObject() as any;
  }
}