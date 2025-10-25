import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, ArrayNotEmpty, IsBoolean, IsEnum, IsInt, Min, IsOptional, IsString } from 'class-validator';

export enum ContentElementType {
  Paragraph = 'paragraph',
  List = 'list',
  Code = 'code',
  Image = 'image',
  Heading = 'heading',
  Quote = 'quote',
}

export class BaseElementDto {
  @ApiProperty({ description: 'Element type', enum: ContentElementType, example: ContentElementType.Paragraph })
  @IsEnum(ContentElementType)
  type: ContentElementType;

  @ApiPropertyOptional({ description: 'Element title', example: 'Overview' })
  @IsOptional()
  @IsString()
  title?: string;
}

export class ParagraphElementDto extends BaseElementDto {
  @ApiProperty({ description: 'Paragraph text', example: 'Welcome to CS101.' })
  @IsString()
  text: string;
}

export class ListElementDto extends BaseElementDto {
  @ApiPropertyOptional({ description: 'Whether the list is ordered', example: false })
  @IsOptional()
  @IsBoolean()
  ordered?: boolean;

  @ApiProperty({ description: 'List items', type: 'string', isArray: true, example: ['Algorithms', 'Data Structures', 'Systems'] })
  @IsArray()
  @ArrayNotEmpty()
  items: string[];
}

export class CodeElementDto extends BaseElementDto {
  @ApiPropertyOptional({ description: 'Programming language hint', example: 'javascript' })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({ description: 'Code content', example: "console.log('Hello, world!');" })
  @IsString()
  code: string;
}

export class ImageElementDto extends BaseElementDto {
  @ApiProperty({ description: 'Image source URL', example: 'https://example.com/image.png' })
  @IsString()
  src: string;

  @ApiPropertyOptional({ description: 'Image height in pixels', example: 240, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  height?: number;

  @ApiPropertyOptional({ description: 'Style hint', example: 'rounded' })
  @IsOptional()
  @IsString()
  style?: string;

  @ApiPropertyOptional({ description: 'Attribution or credits', example: 'Photo by Jane Doe' })
  @IsOptional()
  @IsString()
  attribution?: string;
}