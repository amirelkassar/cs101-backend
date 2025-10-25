import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { LecturesService } from './lectures.service';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lectures: LecturesService) {}

  @Get()
  async listLectures() {
    return this.lectures.findAll();
  }

  @Get(':id')
  async getLecture(@Param('id') id: string) {
    return this.lectures.findById(id);
  }

  @Post()
  async createLecture(@Body() body: any) {
    return this.lectures.create(body);
  }

  @Put(':id')
  async updateLecture(@Param('id') id: string, @Body() body: any) {
    return this.lectures.update(id, body);
  }

  @Delete(':id')
  async deleteLecture(@Param('id') id: string) {
    return this.lectures.remove(id);
  }
}