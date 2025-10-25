import { LecturesService } from './lectures.service';
export declare class LecturesController {
    private readonly lectures;
    constructor(lectures: LecturesService);
    listLectures(): Promise<import("./schemas/lecture.schema").Lecture[]>;
    getLecture(id: string): Promise<import("./schemas/lecture.schema").Lecture>;
    createLecture(body: any): Promise<import("./schemas/lecture.schema").Lecture>;
    updateLecture(id: string, body: any): Promise<import("./schemas/lecture.schema").Lecture>;
    deleteLecture(id: string): Promise<{
        deleted: boolean;
    }>;
}
