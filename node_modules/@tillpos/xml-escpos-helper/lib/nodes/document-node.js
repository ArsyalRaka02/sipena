"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class DocumentNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        if (this.attributes.reverse)
            bufferBuilder.startReverseMode();
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.endReverseMode();
        return bufferBuilder;
    }
}
exports.default = DocumentNode;
