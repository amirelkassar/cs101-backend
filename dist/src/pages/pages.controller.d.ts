import { PagesService } from './pages.service';
export declare class PagesController {
    private readonly pages;
    constructor(pages: PagesService);
    listPages(): Promise<import("./schemas/page.schema").Page[]>;
    getPage(id: string): Promise<import("./schemas/page.schema").Page>;
    createPage(body: any): Promise<import("./schemas/page.schema").Page>;
    updatePage(id: string, body: any): Promise<import("./schemas/page.schema").Page>;
    deletePage(id: string): Promise<{
        deleted: boolean;
    }>;
}
