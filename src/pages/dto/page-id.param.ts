import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageIdParam {
  @ApiProperty({ description: 'Unique page identifier', example: 'introduction' })
  @IsString()
  @IsNotEmpty()
  id: string;
}