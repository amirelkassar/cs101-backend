import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pages: PagesService) {}

  @Get()
  async listPages() {
    return this.pages.findAll();
  }

  @Get(':id')
  async getPage(@Param('id') id: string) {
    return this.pages.findById(id);
  }

  @Post()
  async createPage(@Body() body: any) {
    return this.pages.create(body);
  }

  @Put(':id')
  async updatePage(@Param('id') id: string, @Body() body: any) {
    return this.pages.update(id, body);
  }

  @Delete(':id')
  async deletePage(@Param('id') id: string) {
    return this.pages.remove(id);
  }
}