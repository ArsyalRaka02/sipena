"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class SmallNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        bufferBuilder.startCompressedCharacter();
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.endCompressedCharacter();
        return bufferBuilder;
    }
}
exports.default = SmallNode;
