import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const PageIdParamSchema = z.object({
  id: z.string().min(1, 'id is required'),
});

export class PageIdParam extends createZodDto(PageIdParamSchema) {}