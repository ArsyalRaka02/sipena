"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class BreakLineNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        let lines = 0;
        if (/\d+/.test(this.attributes.lines))
            lines = parseInt(this.attributes.lines) - 1;
        return bufferBuilder.breakLine(lines);
    }
    close(bufferBuilder) {
        return bufferBuilder;
    }
}
exports.default = BreakLineNode;
