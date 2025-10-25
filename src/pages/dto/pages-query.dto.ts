import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const PagesQuerySchema = z.object({
  lectureId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'lectureId must be a MongoId')
    .optional(),
});

export class PagesQueryDto extends createZodDto(PagesQuerySchema) {}