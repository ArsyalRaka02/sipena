"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLNode = void 0;
class XMLNode {
    constructor(node) {
        this.attributes = node.attributes || {};
        this.content = node.content;
        this.children = [];
    }
    addChild(child) {
        if (child)
            this.children.push(child);
    }
    getContent() {
        return this.content;
    }
    draw(bufferBuilder) {
        // open tag
        this.open(bufferBuilder);
        if (this.children.length > 0) {
            this.children.forEach(child => child.draw(bufferBuilder));
        }
        // close tag
        this.close(bufferBuilder);
        return bufferBuilder;
    }
}
exports.XMLNode = XMLNode;
