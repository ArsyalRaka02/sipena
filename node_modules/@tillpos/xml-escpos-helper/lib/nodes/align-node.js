"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
const buffer_builder_1 = require("../buffer-builder");
class AlignNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        switch (this.attributes.mode) {
            case 'center':
                bufferBuilder.startAlign(buffer_builder_1.ALIGNMENT.CENTER);
                break;
            case 'left':
                bufferBuilder.startAlign(buffer_builder_1.ALIGNMENT.LEFT);
                break;
            case 'right':
                bufferBuilder.startAlign(buffer_builder_1.ALIGNMENT.RIGHT);
                break;
        }
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.resetAlign();
        return bufferBuilder;
    }
}
exports.default = AlignNode;
