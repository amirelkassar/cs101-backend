import { HydratedDocument } from 'mongoose';
export type LectureDocument = HydratedDocument<Lecture>;
export declare class PageRef {
    id: string;
    title: string;
    contentFile?: string;
}
export declare const PageRefSchema: import("mongoose").Schema<PageRef, import("mongoose").Model<PageRef, any, any, any, import("mongoose").Document<unknown, any, PageRef, any, {}> & PageRef & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PageRef, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<PageRef>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<PageRef> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare class Lecture {
    title: string;
    order: number;
    pages: PageRef[];
}
export declare const LectureSchema: import("mongoose").Schema<Lecture, import("mongoose").Model<Lecture, any, any, any, import("mongoose").Document<unknown, any, Lecture, any, {}> & Lecture & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Lecture, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Lecture>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Lecture> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
