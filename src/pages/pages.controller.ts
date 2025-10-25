import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PagesService } from './pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pages: PagesService) {}

  @Get(':id')
  async getPage(@Param('id') id: string) {
    return this.pages.findById(id);
  }

  @Post()
  async createPage(@Body() body: any) {
    return this.pages.create(body);
  }
}