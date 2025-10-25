import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';

@Injectable()
export class LecturesService {
  constructor(@InjectModel(Lecture.name) private lectureModel: Model<LectureDocument>) {}

  async findAll(): Promise<Lecture[]> {
    return this.lectureModel.find().sort({ order: 1 }).lean();
  }

  async findById(id: string): Promise<Lecture> {
    const doc = await this.lectureModel.findById(id).lean();
    if (!doc) throw new NotFoundException(`Lecture ${id} not found`);
    return doc as any;
  }

  async create(data: Partial<Lecture>): Promise<Lecture> {
    const created = await this.lectureModel.create(data);
    return created.toObject() as any;
  }

  async update(id: string, data: Partial<Lecture>): Promise<Lecture> {
    const updated = await this.lectureModel.findByIdAndUpdate(id, data, { new: true }).lean();
    if (!updated) throw new NotFoundException(`Lecture ${id} not found`);
    return updated as any;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.lectureModel.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException(`Lecture ${id} not found`);
    return { deleted: true };
  }
}