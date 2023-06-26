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
exports.NoteListComponent = void 0;
var core_1 = require("@angular/core");
var note_1 = require("../entities/note");
var NoteListComponent = /** @class */ (function () {
    function NoteListComponent() {
        this.noteSelectionChange = new core_1.EventEmitter();
        this.noteDeleted = new core_1.EventEmitter();
    }
    NoteListComponent.prototype.selectNote = function (note) {
        this.selectedNote = note;
        this.noteSelectionChange.emit(note);
        return false;
    };
    NoteListComponent.prototype.deleteNote = function (note) {
        this.noteDeleted.emit(note);
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], NoteListComponent.prototype, "notes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", note_1.Note)
    ], NoteListComponent.prototype, "selectedNote", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NoteListComponent.prototype, "noteSelectionChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], NoteListComponent.prototype, "noteDeleted", void 0);
    NoteListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'note-list',
            templateUrl: '/app/templates/note.list.html',
            styleUrls: ['../styles/note.list.css']
        })
    ], NoteListComponent);
    return NoteListComponent;
}());
exports.NoteListComponent = NoteListComponent;
//# sourceMappingURL=note.list.js.map