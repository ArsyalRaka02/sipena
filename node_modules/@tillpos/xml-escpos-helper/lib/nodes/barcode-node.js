"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
const buffer_builder_1 = require("../buffer-builder");
class BarcodeNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        let system, width, height, labelFont, labelPosition, leftSpacing;
        switch (this.attributes.system) {
            case 'UPC_A':
                system = buffer_builder_1.BARCODE_SYSTEM.UPC_A;
                break;
            case 'UPC_E':
                system = buffer_builder_1.BARCODE_SYSTEM.UPC_E;
                break;
            case 'EAN_13':
                system = buffer_builder_1.BARCODE_SYSTEM.EAN_13;
                break;
            case 'EAN_8':
                system = buffer_builder_1.BARCODE_SYSTEM.EAN_8;
                break;
            case 'CODE_39':
                system = buffer_builder_1.BARCODE_SYSTEM.CODE_39;
                break;
            case 'ITF':
                system = buffer_builder_1.BARCODE_SYSTEM.ITF;
                break;
            case 'CODABAR':
                system = buffer_builder_1.BARCODE_SYSTEM.CODABAR;
                break;
            case 'CODE_93':
                system = buffer_builder_1.BARCODE_SYSTEM.CODE_93;
                break;
            case 'CODE_128':
                system = buffer_builder_1.BARCODE_SYSTEM.CODE_128;
                break;
        }
        switch (this.attributes.width) {
            case 'DOT_250':
                width = buffer_builder_1.BARCODE_WIDTH.DOT_250;
                break;
            case 'DOT_375':
                width = buffer_builder_1.BARCODE_WIDTH.DOT_375;
                break;
            case 'DOT_560':
                width = buffer_builder_1.BARCODE_WIDTH.DOT_560;
                break;
            case 'DOT_625':
                width = buffer_builder_1.BARCODE_WIDTH.DOT_625;
                break;
            case 'DOT_750':
                width = buffer_builder_1.BARCODE_WIDTH.DOT_750;
                break;
            default:
                width = buffer_builder_1.BARCODE_WIDTH.DOT_375;
        }
        switch (this.attributes.labelFont) {
            case 'FONT_A':
                labelFont = buffer_builder_1.BARCODE_LABEL_FONT.FONT_A;
                break;
            case 'FONT_B':
                labelFont = buffer_builder_1.BARCODE_LABEL_FONT.FONT_B;
                break;
            default:
                labelFont = buffer_builder_1.BARCODE_LABEL_FONT.FONT_A;
        }
        switch (this.attributes.labelPosition) {
            case 'NOT_PRINT':
                labelPosition = buffer_builder_1.BARCODE_LABEL_POSITION.NOT_PRINT;
                break;
            case 'ABOVE':
                labelPosition = buffer_builder_1.BARCODE_LABEL_POSITION.ABOVE;
                break;
            case 'BOTTOM':
                labelPosition = buffer_builder_1.BARCODE_LABEL_POSITION.BOTTOM;
                break;
            case 'ABOVE_BOTTOM':
                labelPosition = buffer_builder_1.BARCODE_LABEL_POSITION.ABOVE_BOTTOM;
                break;
            default:
                labelPosition = buffer_builder_1.BARCODE_LABEL_POSITION.BOTTOM;
        }
        if (/\d+/.test(this.attributes.height)) {
            height = parseInt(this.attributes.height);
        }
        else {
            height = 162;
        }
        if (/\d+/.test(this.attributes.leftSpacing)) {
            leftSpacing = parseInt(this.attributes.leftSpacing);
        }
        else {
            leftSpacing = 0;
        }
        if (system && this.content) {
            bufferBuilder.printBarcode(this.content, system, width, height, labelFont, labelPosition, leftSpacing);
        }
        return bufferBuilder;
    }
    close(bufferBuilder) {
        return bufferBuilder;
    }
}
exports.default = BarcodeNode;
