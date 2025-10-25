import { IsMongoId, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PagesQueryDto {
  @ApiPropertyOptional({ description: 'Filter by related lecture id', example: '64f0c2e39b1c2a5f8f1c1234' })
  @IsOptional()
  @IsMongoId()
  lectureId?: string;
}