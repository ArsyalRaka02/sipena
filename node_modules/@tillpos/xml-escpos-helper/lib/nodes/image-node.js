"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
const buffer_builder_1 = require("../buffer-builder");
const ndarray_1 = __importDefault(require("ndarray"));
const image_1 = __importDefault(require("../image"));
const pngjs_1 = __importDefault(require("pngjs"));
const PNG = pngjs_1.default.PNG;
class ImageNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        const img_data = PNG.sync.read(Buffer.from(this.content.replace(/&#x2F/g, '/').slice("data:image/png;base64,".length), "base64"));
        const pixels = ndarray_1.default(new Uint8Array(img_data.data), [img_data.width | 0, img_data.height | 0, 4], [4, (4 * img_data.width) | 0, 1], 0);
        let mode;
        switch (this.attributes.mode) {
            case 'NORMAL':
                mode = buffer_builder_1.RASTER_MODE.NORMAL;
                break;
            case 'DW':
                mode = buffer_builder_1.RASTER_MODE.DOUBLE_WIDTH;
                break;
            case 'DH':
                mode = buffer_builder_1.RASTER_MODE.DOUBLE_HEIGHT;
                break;
            case 'DWH':
                mode = buffer_builder_1.RASTER_MODE.DOUBLE_WIDTH_HEIGHT;
                break;
            default:
                mode = buffer_builder_1.RASTER_MODE.NORMAL;
        }
        bufferBuilder.printImage(new image_1.default(pixels), mode);
        return bufferBuilder;
    }
    close(bufferBuilder) {
        return bufferBuilder;
    }
}
exports.default = ImageNode;
