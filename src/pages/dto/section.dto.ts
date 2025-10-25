import { Type } from 'class-transformer'
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator'
import { ApiExtraModels, ApiProperty, ApiPropertyOptional, getSchemaPath } from '@nestjs/swagger'
import { BaseElementDto, ParagraphElementDto, ListElementDto, CodeElementDto, ImageElementDto } from './content-element.dto'

@ApiExtraModels(ParagraphElementDto, ListElementDto, CodeElementDto, ImageElementDto)
export class SectionDto {
  @ApiProperty({ description: 'Section type', example: 'chapter' })
  @IsString()
  type: string

  @ApiPropertyOptional({ description: 'Section title', example: 'Getting Started' })
  @IsOptional()
  @IsString()
  title?: string

  @ApiPropertyOptional({
    description: 'Section content elements',
    type: 'array',
    items: {
      oneOf: [
        { $ref: getSchemaPath(ParagraphElementDto) },
        { $ref: getSchemaPath(ListElementDto) },
        { $ref: getSchemaPath(CodeElementDto) },
        { $ref: getSchemaPath(ImageElementDto) },
      ],
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BaseElementDto)
  content?: Array<ParagraphElementDto | ListElementDto | CodeElementDto | ImageElementDto>
}