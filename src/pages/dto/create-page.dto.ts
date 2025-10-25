import { IsNotEmpty, IsOptional, IsString, IsArray, IsMongoId, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePageDto {
  @ApiProperty({ description: 'Unique page identifier (slug or custom id)', example: 'introduction' })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional({ description: 'Unique human-readable slug', example: 'intro-to-cs' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiProperty({ description: 'Page title', example: 'Introduction' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Short description', example: 'Overview of the course' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Tags for the page', type: 'string', isArray: true, example: ['basics', 'intro'] })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiPropertyOptional({ description: 'Estimated reading time (minutes)', example: 5, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  estimatedTime?: number;

  @ApiPropertyOptional({ description: 'Arbitrary JSON content', type: 'object', additionalProperties: true })
  @IsOptional()
  content?: any;

  @ApiPropertyOptional({ description: 'Structured sections content', type: 'object', isArray: true, additionalProperties: true })
  @IsOptional()
  sections?: any[];

  @ApiPropertyOptional({ description: 'Related lecture id', example: '64f0c2e39b1c2a5f8f1c1234' })
  @IsOptional()
  @IsMongoId()
  lectureId?: string;
}