import { Body, Controller, Get, Post } from '@nestjs/common';
import { LecturesService } from './lectures.service';

@Controller('lectures')
export class LecturesController {
  constructor(private readonly lectures: LecturesService) {}

  @Get()
  async listLectures() {
    return this.lectures.findAll();
  }

  @Post()
  async createLecture(@Body() body: any) {
    return this.lectures.create(body);
  }
}