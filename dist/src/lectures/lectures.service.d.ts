import { Model } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';
export declare class LecturesService {
    private lectureModel;
    constructor(lectureModel: Model<LectureDocument>);
    findAll(): Promise<Lecture[]>;
    findById(id: string): Promise<Lecture>;
    create(data: Partial<Lecture>): Promise<Lecture>;
    update(id: string, data: Partial<Lecture>): Promise<Lecture>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
