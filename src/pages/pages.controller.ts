import { Body, Controller, Get, Param, Post, Put, Delete, Query } from '@nestjs/common'
import { PagesService } from './pages.service'
import { CreatePageDto } from './dto/create-page.dto'
import { UpdatePageDto } from './dto/update-page.dto'
import { PageIdParam } from './dto/page-id.param'
import { PagesQueryDto } from './dto/pages-query.dto'
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiNotFoundResponse, ApiBadRequestResponse, ApiBody, ApiQuery } from '@nestjs/swagger'

@ApiTags('pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pages: PagesService) {}

  @Get()
  @ApiOperation({ summary: 'List all pages' })
  @ApiOkResponse({ description: 'Pages retrieved successfully.' })
  @ApiQuery({ name: 'lectureId', required: false, description: 'Filter by related lecture id' })
  async listPages(@Query() query: PagesQueryDto) {
    return this.pages.findAll(query.lectureId)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a page by ID' })
  @ApiParam({ name: 'id', description: 'Unique page identifier' })
  @ApiOkResponse({ description: 'Page retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Page not found.' })
  async getPage(@Param() params: PageIdParam) {
    return this.pages.findById(params.id)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new page' })
  @ApiCreatedResponse({ description: 'Page created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid page payload.' })
  @ApiBody({ type: CreatePageDto })
  async createPage(@Body() body: CreatePageDto) {
    return this.pages.create(body)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing page' })
  @ApiParam({ name: 'id', description: 'Unique page identifier' })
  @ApiOkResponse({ description: 'Page updated successfully.' })
  @ApiNotFoundResponse({ description: 'Page not found.' })
  @ApiBadRequestResponse({ description: 'Invalid page payload.' })
  @ApiBody({ type: UpdatePageDto })
  async updatePage(@Param() { id }: PageIdParam, @Body() body: UpdatePageDto) {
    return this.pages.update(id, body)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a page' })
  @ApiParam({ name: 'id', description: 'Unique page identifier' })
  @ApiOkResponse({ description: 'Page deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Page not found.' })
  async deletePage(@Param() params: PageIdParam) {
    return this.pages.remove(params.id)
  }
}