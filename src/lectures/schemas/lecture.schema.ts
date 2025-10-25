import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';

export type LectureDocument = HydratedDocument<Lecture>;

@Schema({ timestamps: true })
export class Lecture {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Page', default: [] })
  pages: string[];
}

export const LectureSchema = SchemaFactory.createForClass(Lecture);