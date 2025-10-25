import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description?: string;

  @Prop({ type: [String], default: [] })
  tags?: string[];

  @Prop()
  estimatedTime?: number;

  @Prop({ type: SchemaTypes.Mixed })
  sections?: any;

  @Prop({ type: SchemaTypes.Mixed })
  content?: any;
}

export const PageSchema = SchemaFactory.createForClass(Page);