import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';
import { LectureDetail, LecturePageRef, LectureSummary } from './dto/lecture-response.dto';

function isPopulatedPage(p: unknown): p is { _id: Types.ObjectId; title: string; slug: string; icon: string } {
  return (
    !!p &&
    typeof p === 'object' &&
    '_id' in (p as Record<string, unknown>) &&
    'title' in (p as Record<string, unknown>) &&
    'slug' in (p as Record<string, unknown>) &&
    'icon' in (p as Record<string, unknown>)
  );
}

@Injectable()
export class LecturesService {
  constructor(@InjectModel(Lecture.name) private lectureModel: Model<LectureDocument>) {}

  async findAll(): Promise<LectureSummary[]> {
    const lectures = await this.lectureModel
      .find()
      .sort({ order: 1 })
      .select({ pages: 0 })
      .lean<{ _id: Types.ObjectId; title: string; order: number }[]>();

    return lectures.map((l) => ({ id: String(l._id), title: l.title, order: l.order }));
  }

  async findById(id: string): Promise<LectureDetail> {
    const doc = await this.lectureModel
      .findById(id)
      .populate({ path: 'pages', select: 'slug title icon', model: 'Page' })
      .lean<{ _id: Types.ObjectId; title: string; order: number; pages?: unknown } | null>();

    if (!doc) throw new NotFoundException(`Lecture ${id} not found`);

    const pagesArray = Array.isArray(doc.pages) ? doc.pages : [];
    const pages: LecturePageRef[] = pagesArray
      .filter((p): p is { _id: Types.ObjectId; title: string; slug: string; icon: string } => isPopulatedPage(p))
      .map((p) => ({ id: String(p._id), title: p.title, slug: p.slug, icon: p.icon }));

    return { id: String(doc._id), title: doc.title, order: doc.order, pages };
  }

  async create(data: Partial<Lecture>): Promise<LectureSummary> {
    const created = await this.lectureModel.create(data);
    const obj = created.toObject() as { _id: Types.ObjectId; title: string; order: number };
    return { id: String(obj._id), title: obj.title, order: obj.order };
  }

  async update(id: string, data: Partial<Lecture>): Promise<LectureSummary> {
    const updated = await this.lectureModel
      .findByIdAndUpdate(id, data, { new: true })
      .lean<{ _id: Types.ObjectId; title: string; order: number } | null>();
    if (!updated) throw new NotFoundException(`Lecture ${id} not found`);
    return { id: String(updated._id), title: updated.title, order: updated.order };
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.lectureModel.findByIdAndDelete(id).lean();
    if (!res) throw new NotFoundException(`Lecture ${id} not found`);
    return { deleted: true };
  }
}