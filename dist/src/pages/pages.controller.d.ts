import { PagesService } from './pages.service';
export declare class PagesController {
    private readonly pages;
    constructor(pages: PagesService);
    getPage(id: string): Promise<import("./schemas/page.schema").Page>;
    createPage(body: any): Promise<import("./schemas/page.schema").Page>;
}
