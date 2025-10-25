import { IsMongoId } from 'class-validator';

export class LectureIdParam {
  @IsMongoId()
  id!: string;
}