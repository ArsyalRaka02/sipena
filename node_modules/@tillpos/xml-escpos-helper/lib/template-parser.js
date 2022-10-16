"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateParser = void 0;
const mustache_1 = __importDefault(require("mustache"));
const xml_parser_1 = require("./xml-parser");
class TemplateParser {
    constructor() {
        this.mustache = mustache_1.default;
    }
    parser(template, scope) {
        const xml = this.mustache.render(template, scope);
        return new xml_parser_1.XMLParser().parser(xml);
    }
}
exports.TemplateParser = TemplateParser;
