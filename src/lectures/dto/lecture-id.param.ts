import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const LectureIdParamSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'id must be a MongoId'),
});

export class LectureIdParam extends createZodDto(LectureIdParamSchema) {}