"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
const text_node_1 = __importDefault(require("./text-node"));
class TextLineNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
        this.textNode = new text_node_1.default(node);
    }
    open(bufferBuilder) {
        return this.textNode.open(bufferBuilder);
    }
    close(bufferBuilder) {
        return this.textNode.close(bufferBuilder).breakLine();
    }
}
exports.default = TextLineNode;
