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
exports.NoteService = void 0;
var core_1 = require("@angular/core");
var note_1 = require("../entities/note");
var local_storage_1 = require("./local.storage");
var id_generator_1 = require("./id.generator");
var NoteService = /** @class */ (function () {
    function NoteService(storageService, idGeneratorService) {
        this.storageService = storageService;
        this.idGeneratorService = idGeneratorService;
    }
    NoteService.prototype.getNotes = function () {
        var _this = this;
        return this.storageService.loadNotes()
            .then(function (notes) {
            notes.forEach(function (n) { return _this.idGeneratorService.checkNumber(n.id); });
            return notes;
        });
    };
    NoteService.prototype.saveNotes = function (notes) {
        return this.storageService.saveNotes(notes);
    };
    NoteService.prototype.saveNote = function (note) {
        return this.storageService.saveNote(note);
    };
    NoteService.prototype.createNote = function () {
        return new note_1.Note('', this.idGeneratorService.getIdForNew());
    };
    NoteService.prototype.deleteNote = function (note) {
        return this.storageService.deleteNote(note);
    };
    NoteService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [local_storage_1.LocalStorageService,
            id_generator_1.IdGeneratorService])
    ], NoteService);
    return NoteService;
}());
exports.NoteService = NoteService;
//# sourceMappingURL=note.js.map