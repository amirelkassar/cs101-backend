import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LectureDocument = HydratedDocument<Lecture>;

@Schema()
export class PageRef {
  @Prop() id: string;
  @Prop() title: string;
  @Prop() contentFile?: string;
}
export const PageRefSchema = SchemaFactory.createForClass(PageRef);

@Schema({ timestamps: true })
export class Lecture {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 0 })
  order: number;

  @Prop({ type: [PageRefSchema], default: [] })
  pages: PageRef[];
}

export const LectureSchema = SchemaFactory.createForClass(Lecture);