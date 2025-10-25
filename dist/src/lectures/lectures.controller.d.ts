import { LecturesService } from './lectures.service';
export declare class LecturesController {
    private readonly lectures;
    constructor(lectures: LecturesService);
    listLectures(): Promise<import("./schemas/lecture.schema").Lecture[]>;
    createLecture(body: any): Promise<import("./schemas/lecture.schema").Lecture>;
}
