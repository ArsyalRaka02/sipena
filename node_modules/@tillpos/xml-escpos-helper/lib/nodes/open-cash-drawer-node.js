"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class OpenCashDrawerNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        return bufferBuilder.openCashDrawer();
    }
    close(bufferBuilder) {
        return bufferBuilder;
    }
}
exports.default = OpenCashDrawerNode;
