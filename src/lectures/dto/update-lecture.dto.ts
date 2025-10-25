import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLectureDto {
  @ApiPropertyOptional({ description: 'Lecture title', example: 'Introduction to Algorithms', minLength: 1 })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ description: 'Display order (non-negative integer)', example: 1, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}