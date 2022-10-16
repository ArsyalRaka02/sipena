"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xml_node_1 = require("../xml-node");
class QRcodeNode extends xml_node_1.XMLNode {
    constructor(node) {
        super(node);
    }
    open(bufferBuilder) {
        let qrModel, qrSize, ecLevel;
        switch (this.attributes.model) {
            case '1':
                qrModel = 49;
                break;
            case '2':
                qrModel = 50;
                break;
            default:
                qrModel = 50;
        }
        if (/\d+/.test(this.attributes.size)) {
            qrSize = parseInt(this.attributes.size);
        }
        else {
            qrSize = 8;
        }
        switch (this.attributes.ecl) {
            case 'L':
                ecLevel = 48;
                break;
            case 'M':
                ecLevel = 49;
                break;
            case 'Q':
                ecLevel = 50;
                break;
            case 'H':
                ecLevel = 51;
                break;
            default:
                ecLevel = 48;
        }
        if (this.content) {
            let url = this.content.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#x3D;/g, '=').replace(/&#x2F;/g, '/').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
            bufferBuilder.printQRcode(url, qrModel, qrSize, ecLevel);
        }
        return bufferBuilder;
    }
    close(bufferBuilder) {
        return bufferBuilder;
    }
}
exports.default = QRcodeNode;
