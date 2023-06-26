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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageService = void 0;
var core_1 = require("@angular/core");
var note_1 = require("../entities/note");
var logger_1 = require("./logger");
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService(loggerService) {
        this.loggerService = loggerService;
    }
    LocalStorageService_1 = LocalStorageService;
    LocalStorageService.prototype.saveNotes = function (notes) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loggerService.log('Save notes: ', notes);
            _this.saveRawDataIntoLocalStorage(notes);
            resolve(notes);
        });
    };
    LocalStorageService.prototype.saveNote = function (note) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loggerService.log('Save note: ', note);
            var rawData = _this.loadRawDataFromLocalStorage();
            var rawNote = rawData.find(function (x) { return x.id == note.id; });
            if (rawNote) {
                rawNote.text = note.text;
            }
            else {
                rawData.push(note);
            }
            _this.saveRawDataIntoLocalStorage(rawData);
            resolve(note);
        });
    };
    LocalStorageService.prototype.deleteNote = function (note) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loggerService.log('Delete note: ', note);
            var allNotes = _this.loadRawDataFromLocalStorage();
            var noteWithoutOne = allNotes.filter(function (x) { return x.id != note.id; });
            _this.saveRawDataIntoLocalStorage(noteWithoutOne);
            resolve(note);
        });
    };
    LocalStorageService.prototype.loadNotes = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loggerService.log('Load notes');
            resolve(_this.loadRawDataFromLocalStorage()
                .map(function (r) { return new note_1.Note(r.text, r.id); }));
        });
    };
    LocalStorageService.prototype.loadRawDataFromLocalStorage = function () {
        var rawData = localStorage.getItem(LocalStorageService_1.LOCAL_STORAGE_KEY);
        if (!rawData) {
            return [];
        }
        return JSON.parse(rawData);
    };
    LocalStorageService.prototype.saveRawDataIntoLocalStorage = function (rawNotes) {
        var rawData = JSON.stringify(rawNotes);
        localStorage.setItem(LocalStorageService_1.LOCAL_STORAGE_KEY, rawData);
    };
    var LocalStorageService_1;
    LocalStorageService.LOCAL_STORAGE_KEY = "notes";
    LocalStorageService = LocalStorageService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [logger_1.LoggerService])
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
//# sourceMappingURL=local.storage.js.map