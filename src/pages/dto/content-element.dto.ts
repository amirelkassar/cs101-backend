import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export enum ContentElementType {
  Paragraph = 'paragraph',
  List = 'list',
  Code = 'code',
  Image = 'image',
  Heading = 'heading',
  Quote = 'quote',
}

const BaseElementSchema = z.object({
  type: z.enum(ContentElementType),
  title: z.string().optional(),
});

export const ParagraphElementSchema = BaseElementSchema.extend({
  type: z.literal(ContentElementType.Paragraph),
  text: z.string(),
});

export const ListElementSchema = BaseElementSchema.extend({
  type: z.literal(ContentElementType.List),
  ordered: z.boolean().optional(),
  items: z.array(z.string()).min(1, 'items must contain at least one item'),
});

export const CodeElementSchema = BaseElementSchema.extend({
  type: z.literal(ContentElementType.Code),
  language: z.string().optional(),
  code: z.string(),
});

export const ImageElementSchema = BaseElementSchema.extend({
  type: z.literal(ContentElementType.Image),
  src: z.string(),
  height: z.number().int().min(0).optional(),
  style: z.string().optional(),
  attribution: z.string().optional(),
});

export class ParagraphElementDto extends createZodDto(ParagraphElementSchema) {}
export class ListElementDto extends createZodDto(ListElementSchema) {}
export class CodeElementDto extends createZodDto(CodeElementSchema) {}
export class ImageElementDto extends createZodDto(ImageElementSchema) {}