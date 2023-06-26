"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var app_1 = require("./components/app");
var note_detail_1 = require("./components/note.detail");
var note_list_1 = require("./components/note.list");
var note_title_pipe_1 = require("./pipes/note.title.pipe");
var logger_1 = require("./services/logger");
var interval_1 = require("./services/interval");
var id_generator_1 = require("./services/id.generator");
var local_storage_1 = require("./services/local.storage");
var silence_logger_1 = require("./services/silence.logger");
var browser_interaction_1 = require("./services/browser.interaction");
var note_1 = require("./services/note");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule
            ],
            declarations: [
                app_1.AppComponent,
                note_detail_1.NoteDetailComponent,
                note_list_1.NoteListComponent,
                note_title_pipe_1.NoteTitlePipe
            ],
            providers: [
                { provide: logger_1.LoggerService, useClass: silence_logger_1.SilenceLoggerService },
                local_storage_1.LocalStorageService,
                id_generator_1.IdGeneratorService,
                note_1.NoteService,
                interval_1.IntervalService,
                browser_interaction_1.BrowserInteractionService
            ],
            bootstrap: [
                app_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map