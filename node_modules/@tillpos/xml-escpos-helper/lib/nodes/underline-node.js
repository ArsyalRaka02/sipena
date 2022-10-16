"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
const buffer_builder_1 = require("../buffer-builder");
class UnderlineNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        switch (this.attributes.mode) {
            case 'one-point':
                bufferBuilder.startUnderline(buffer_builder_1.UNDERLINE_MODE.ONE_POINT_OF_COARSE);
                break;
            case 'two-points':
                bufferBuilder.startUnderline(buffer_builder_1.UNDERLINE_MODE.TWO_POINTS_OF_COARSE);
                break;
            default:
                bufferBuilder.startUnderline();
        }
        return bufferBuilder;
    }
    close(bufferBuilder) {
        bufferBuilder.endUnderline();
        return bufferBuilder;
    }
}
exports.default = UnderlineNode;
