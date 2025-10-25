import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreatePageSchema = z.object({
  slug: z.string().min(1, 'slug is required').optional(),
  title: z.string().min(1, 'title is required'),
  icon: z.string().min(1, 'icon is required'),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  estimatedTime: z.number().int().min(0).optional(),
  sections: z.array(z.any()).optional(),
  lectureId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'lectureId must be a MongoId')
    .optional(),
});

export class CreatePageDto extends createZodDto(CreatePageSchema) {}
