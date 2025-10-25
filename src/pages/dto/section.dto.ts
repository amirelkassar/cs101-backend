import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { ParagraphElementSchema, ListElementSchema, CodeElementSchema, ImageElementSchema } from './content-element.dto';

export const SectionSchema = z.object({
  type: z.string(),
  title: z.string().optional(),
  content: z.array(z.union([ParagraphElementSchema, ListElementSchema, CodeElementSchema, ImageElementSchema])).optional(),
});

export class SectionDto extends createZodDto(SectionSchema) {}