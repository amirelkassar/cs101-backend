import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateLectureSchema = z.object({
  title: z.string().min(1, 'title is required'),
  order: z.number().int().min(0).optional(),
  pages: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, 'each page id must be a MongoId'))
    .optional(),
});

export class CreateLectureDto extends createZodDto(CreateLectureSchema) {}