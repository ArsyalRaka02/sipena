"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class WhiteModeNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        bufferBuilder.startWhiteMode();
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.endWhiteMode();
        return bufferBuilder;
    }
}
exports.default = WhiteModeNode;
