"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteTitlePipe = void 0;
var core_1 = require("@angular/core");
var NoteTitlePipe = /** @class */ (function () {
    function NoteTitlePipe() {
    }
    NoteTitlePipe_1 = NoteTitlePipe;
    NoteTitlePipe.prototype.transform = function (value) {
        if (!value || !value.text) {
            return '';
        }
        var title = value.text
            .replace('\n', '')
            .trim();
        if (title == '') {
            return '';
        }
        return title.length > NoteTitlePipe_1.TITLE_MAX_LENGTH
            ? title.substr(0, NoteTitlePipe_1.TITLE_MAX_LENGTH) + '...'
            : title;
    };
    var NoteTitlePipe_1;
    NoteTitlePipe.TITLE_MAX_LENGTH = 20;
    NoteTitlePipe = NoteTitlePipe_1 = __decorate([
        core_1.Pipe({
            name: 'noteTitle',
            pure: false
        })
    ], NoteTitlePipe);
    return NoteTitlePipe;
}());
exports.NoteTitlePipe = NoteTitlePipe;
//# sourceMappingURL=note.title.pipe.js.map