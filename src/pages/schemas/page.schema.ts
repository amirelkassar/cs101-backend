import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type PageDocument = HydratedDocument<Page>;

@Schema({ timestamps: true })
export class Page {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ type: SchemaTypes.Mixed })
  content: any;
}

export const PageSchema = SchemaFactory.createForClass(Page);