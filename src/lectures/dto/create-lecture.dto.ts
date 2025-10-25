import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLectureDto {
  @ApiProperty({ description: 'Lecture title', example: 'Introduction to CS', minLength: 1 })
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ description: 'Display order (non-negative integer)', example: 0, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}