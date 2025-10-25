import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async findAll(lectureId?: string): Promise<Page[]> {
    const filter: any = {};
    if (lectureId) filter.lectureId = lectureId;
    return this.pageModel.find(filter).sort({ title: 1 }).lean();
  }

  async findById(id: string): Promise<Page> {
    const doc = await this.pageModel.findOne({ slug: id }).lean();
    if (!doc) throw new NotFoundException(`Page ${id} not found`);
    return doc as Page;
  }

  async create(data: Partial<Page>): Promise<Page> {
    const created = await this.pageModel.create(data);
    return created.toObject() as Page;
  }

  async update(id: string, data: Partial<Page>): Promise<Page> {
    const updated = await this.pageModel.findOneAndUpdate({ slug: id }, data, { new: true }).lean();
    if (!updated) throw new NotFoundException(`Page ${id} not found`);
    return updated as Page;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.pageModel.findOneAndDelete({ slug: id }).lean();
    if (!res) throw new NotFoundException(`Page ${id} not found`);
    return { deleted: true };
  }
}