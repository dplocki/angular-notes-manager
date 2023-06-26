"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGeneratorService = void 0;
var core_1 = require("@angular/core");
var IdGeneratorService = /** @class */ (function () {
    function IdGeneratorService() {
        this.nextId = 1;
    }
    IdGeneratorService.prototype.getIdForNew = function () {
        var id = this.nextId;
        this.nextId++;
        return id;
    };
    IdGeneratorService.prototype.checkNumber = function (id) {
        if (this.nextId < id) {
            this.nextId = id++;
        }
    };
    IdGeneratorService = __decorate([
        core_1.Injectable()
    ], IdGeneratorService);
    return IdGeneratorService;
}());
exports.IdGeneratorService = IdGeneratorService;
//# sourceMappingURL=id.generator.js.map