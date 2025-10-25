import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UpdateLectureSchema = z.object({
  title: z.string().min(1, 'title is required').optional(),
  order: z.number().int().min(0).optional(),
});

export class UpdateLectureDto extends createZodDto(UpdateLectureSchema) {}