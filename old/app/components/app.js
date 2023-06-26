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
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var note_1 = require("../entities/note");
var note_2 = require("../services/note");
var interval_1 = require("../services/interval");
var browser_interaction_1 = require("../services/browser.interaction");
var AppComponent = /** @class */ (function () {
    function AppComponent(noteService, intervalService, browserInteractionService) {
        this.noteService = noteService;
        this.intervalService = intervalService;
        this.browserInteractionService = browserInteractionService;
        this.notes = null;
        this.isSavingInProgress = false;
        this.changeDetector = new ChangeDetector();
        this.setNotes([]);
    }
    AppComponent_1 = AppComponent;
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.noteService
            .getNotes()
            .then(function (notes) {
            _this.setNotes(notes);
            _this.startTimeInterval();
        });
    };
    AppComponent.prototype.selectedNoteChange = function (note) {
        this.callSaveNoteFromService(this.selectedNote);
        this.selectedNote = note;
        this.changeDetector.setNote(note);
    };
    AppComponent.prototype.deleteNoteFromList = function (note) {
        this.deleteNote(note);
    };
    AppComponent.prototype.addNoteButtonClick = function (event) {
        var newNote = this.noteService.createNote();
        this.notes.push(newNote);
        this.selectedNoteChange(newNote);
    };
    AppComponent.prototype.saveNoteButtonClick = function (event) {
        // I used to have a blocked here in case of ongoing saving operation,
        // but I remove it: gives more problems than gets
        var _this = this;
        this.callSaveNoteFromService(this.selectedNote)
            .then(function () { return _this.startTimeInterval(); });
    };
    AppComponent.prototype.deleteNoteButtonClick = function (event) {
        this.deleteNote(this.selectedNote);
    };
    AppComponent.prototype.deleteNote = function (note) {
        if (!this.browserInteractionService.question('Do you realy wish to delete the note?')) {
            return;
        }
        this.notes = this.notes.filter(function (n) { return n.id != note.id; });
        if (note == this.selectedNote) {
            this.setNotes(this.notes);
        }
        this.noteService.deleteNote(note);
    };
    AppComponent.prototype.setNotes = function (notes) {
        this.notes = notes;
        if (this.notes.length === 0) {
            this.notes.push(this.noteService.createNote());
        }
        this.selectedNote = this.notes[0];
        this.changeDetector.setNote(this.notes[0]);
    };
    AppComponent.prototype.startTimeInterval = function () {
        var _this = this;
        this.intervalService.clearInterval();
        this.intervalService.setInterval(AppComponent_1.INTERVAL_TIME, function () { return _this.callSaveNoteFromService(_this.selectedNote); });
    };
    AppComponent.prototype.callSaveNoteFromService = function (note) {
        var _this = this;
        if (!this.changeDetector.wasChanged()) {
            return Promise.resolve();
        }
        this.isSavingInProgress = true;
        return this.noteService.saveNote(note)
            .then(function () {
            _this.isSavingInProgress = false;
            _this.changeDetector.setNote(_this.selectedNote);
        });
    };
    var AppComponent_1;
    AppComponent.INTERVAL_TIME = 5000;
    __decorate([
        core_1.Input(),
        __metadata("design:type", note_1.Note)
    ], AppComponent.prototype, "selectedNote", void 0);
    AppComponent = AppComponent_1 = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: '/app/templates/app.html',
            providers: [
                note_2.NoteService,
                interval_1.IntervalService,
                browser_interaction_1.BrowserInteractionService
            ],
            styleUrls: ['../styles/app.css']
        }),
        __metadata("design:paramtypes", [note_2.NoteService,
            interval_1.IntervalService,
            browser_interaction_1.BrowserInteractionService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var ChangeDetector = /** @class */ (function () {
    function ChangeDetector() {
    }
    ChangeDetector.prototype.setNote = function (note) {
        this.originalText = note.text;
        this.note = note;
    };
    ChangeDetector.prototype.wasChanged = function () {
        if (this.note.text === '') { // in case of new object
            return true;
        }
        return this.note.text !== this.originalText;
    };
    return ChangeDetector;
}());
//# sourceMappingURL=app.js.map