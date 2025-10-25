import { LecturesService } from './lectures.service';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { LectureIdParam } from './dto/lecture-id.param';
export declare class LecturesController {
    private readonly lectures;
    constructor(lectures: LecturesService);
    listLectures(): Promise<import("./schemas/lecture.schema").Lecture[]>;
    getLecture(params: LectureIdParam): Promise<import("./schemas/lecture.schema").Lecture>;
    createLecture(body: CreateLectureDto): Promise<import("./schemas/lecture.schema").Lecture>;
    updateLecture({ id }: LectureIdParam, body: UpdateLectureDto): Promise<import("./schemas/lecture.schema").Lecture>;
    deleteLecture(params: LectureIdParam): Promise<{
        deleted: boolean;
    }>;
}
