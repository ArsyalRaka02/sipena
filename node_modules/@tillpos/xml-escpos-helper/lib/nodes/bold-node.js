"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class BoldNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        bufferBuilder.startBold();
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.endBold();
        return bufferBuilder;
    }
}
exports.default = BoldNode;
