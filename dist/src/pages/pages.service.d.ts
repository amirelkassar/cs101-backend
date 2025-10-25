import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
export declare class PagesService {
    private pageModel;
    constructor(pageModel: Model<PageDocument>);
    findById(id: string): Promise<Page>;
    create(data: Partial<Page>): Promise<Page>;
}
