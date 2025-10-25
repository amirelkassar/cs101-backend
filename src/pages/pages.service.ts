import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class PagesService {
  constructor(@InjectModel(Page.name) private pageModel: Model<PageDocument>) {}

  async findById(id: string): Promise<Page> {
    const doc = await this.pageModel.findOne({ id }).lean();
    if (!doc) throw new NotFoundException(`Page ${id} not found`);
    return doc as any;
  }

  async create(data: Partial<Page>): Promise<Page> {
    const created = await this.pageModel.create(data);
    return created.toObject() as any;
  }
}