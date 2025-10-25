import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { BaseElementSchema } from './content-element.dto';

export const SectionSchema = z.object({
  type: z.string(),
  title: z.string().optional(),
  content: z.array(BaseElementSchema).optional(),
});

export class SectionDto extends createZodDto(SectionSchema) {}