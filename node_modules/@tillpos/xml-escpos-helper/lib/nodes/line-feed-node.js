"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class LineFeedNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        return bufferBuilder.lineFeed();
    }
    close(bufferBuilder) {
        return bufferBuilder;
    }
}
exports.default = LineFeedNode;
