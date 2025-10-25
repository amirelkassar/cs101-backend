"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LecturesController = void 0;
const common_1 = require("@nestjs/common");
const lectures_service_1 = require("./lectures.service");
const create_lecture_dto_1 = require("./dto/create-lecture.dto");
const update_lecture_dto_1 = require("./dto/update-lecture.dto");
const lecture_id_param_1 = require("./dto/lecture-id.param");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("@nestjs/swagger");
let LecturesController = class LecturesController {
    lectures;
    constructor(lectures) {
        this.lectures = lectures;
    }
    async listLectures() {
        return this.lectures.findAll();
    }
    async getLecture(params) {
        return this.lectures.findById(params.id);
    }
    async createLecture(body) {
        return this.lectures.create(body);
    }
    async updateLecture({ id }, body) {
        return this.lectures.update(id, body);
    }
    async deleteLecture(params) {
        return this.lectures.remove(params.id);
    }
};
exports.LecturesController = LecturesController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all lectures' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lectures retrieved successfully.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "listLectures", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a lecture by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lecture Mongo ObjectId' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lecture retrieved successfully.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Lecture not found.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecture_id_param_1.LectureIdParam]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "getLecture", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new lecture' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Lecture created successfully.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid lecture payload.' }),
    (0, swagger_2.ApiBody)({ type: create_lecture_dto_1.CreateLectureDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lecture_dto_1.CreateLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "createLecture", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an existing lecture' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lecture Mongo ObjectId' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lecture updated successfully.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Lecture not found.' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid lecture payload.' }),
    (0, swagger_2.ApiBody)({ type: update_lecture_dto_1.UpdateLectureDto }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecture_id_param_1.LectureIdParam,
        update_lecture_dto_1.UpdateLectureDto]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "updateLecture", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a lecture' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Lecture Mongo ObjectId' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Lecture deleted successfully.' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Lecture not found.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [lecture_id_param_1.LectureIdParam]),
    __metadata("design:returntype", Promise)
], LecturesController.prototype, "deleteLecture", null);
exports.LecturesController = LecturesController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    (0, swagger_1.ApiTags)('lectures'),
    (0, common_1.Controller)('lectures'),
    __metadata("design:paramtypes", [lectures_service_1.LecturesService])
], LecturesController);
//# sourceMappingURL=lectures.controller.js.map