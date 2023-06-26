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
exports.NoteDetailComponent = void 0;
var core_1 = require("@angular/core");
var note_1 = require("../entities/note");
var NoteDetailComponent = /** @class */ (function () {
    function NoteDetailComponent() {
    }
    NoteDetailComponent.prototype.onKey = function (event) {
        this.note.text = event.target.value;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", note_1.Note)
    ], NoteDetailComponent.prototype, "note", void 0);
    NoteDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'note-detail',
            templateUrl: '/app/templates/note.detail.html',
            styleUrls: ['../styles/note.detail.css']
        })
    ], NoteDetailComponent);
    return NoteDetailComponent;
}());
exports.NoteDetailComponent = NoteDetailComponent;
//# sourceMappingURL=note.detail.js.map