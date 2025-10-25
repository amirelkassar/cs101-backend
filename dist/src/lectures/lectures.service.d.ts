import { Model } from 'mongoose';
import { Lecture, LectureDocument } from './schemas/lecture.schema';
export declare class LecturesService {
    private lectureModel;
    constructor(lectureModel: Model<LectureDocument>);
    findAll(): Promise<Lecture[]>;
    create(data: Partial<Lecture>): Promise<Lecture>;
}
