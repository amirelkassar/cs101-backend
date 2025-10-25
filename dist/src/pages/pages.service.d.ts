import { Model } from 'mongoose';
import { Page, PageDocument } from './schemas/page.schema';
export declare class PagesService {
    private pageModel;
    constructor(pageModel: Model<PageDocument>);
    findAll(): Promise<Page[]>;
    findById(id: string): Promise<Page>;
    create(data: Partial<Page>): Promise<Page>;
    update(id: string, data: Partial<Page>): Promise<Page>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
