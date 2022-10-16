"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscPos = void 0;
const template_parser_1 = require("./template-parser");
const xml_parser_1 = require("./xml-parser");
const buffer_builder_1 = require("./buffer-builder");
class EscPos {
    static getBufferFromTemplate(template, data) {
        let templateParser = new template_parser_1.TemplateParser();
        return templateParser.parser(template, data).build();
    }
    static getBufferFromXML(xml) {
        let xmlParser = new xml_parser_1.XMLParser();
        return xmlParser.parser(xml).build();
    }
    static getBufferBuilder() {
        return new buffer_builder_1.BufferBuilder();
    }
}
exports.EscPos = EscPos;
