import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { LectureIdParam } from './dto/lecture-id.param';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { ApiBody } from '@nestjs/swagger';

@ApiTags('lectures')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lectures: LecturesService) {}

  @Get()
  @ApiOperation({ summary: 'List all lectures' })
  @ApiOkResponse({ description: 'Lectures retrieved successfully.' })
  async listLectures() {
    return this.lectures.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lecture by ID' })
  @ApiParam({ name: 'id', description: 'Lecture Mongo ObjectId' })
  @ApiOkResponse({ description: 'Lecture retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Lecture not found.' })
  async getLecture(@Param() params: LectureIdParam) {
    return this.lectures.findById(params.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new lecture' })
  @ApiCreatedResponse({ description: 'Lecture created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid lecture payload.' })
  @ApiBody({ type: CreateLectureDto })
  async createLecture(@Body() body: CreateLectureDto) {
    return this.lectures.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing lecture' })
  @ApiParam({ name: 'id', description: 'Lecture Mongo ObjectId' })
  @ApiOkResponse({ description: 'Lecture updated successfully.' })
  @ApiNotFoundResponse({ description: 'Lecture not found.' })
  @ApiBadRequestResponse({ description: 'Invalid lecture payload.' })
  @ApiBody({ type: UpdateLectureDto })
  async updateLecture(
    @Param() { id }: LectureIdParam,
    @Body() body: UpdateLectureDto,
  ) {
    return this.lectures.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lecture' })
  @ApiParam({ name: 'id', description: 'Lecture Mongo ObjectId' })
  @ApiOkResponse({ description: 'Lecture deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Lecture not found.' })
  async deleteLecture(@Param() params: LectureIdParam) {
    return this.lectures.remove(params.id);
  }
}