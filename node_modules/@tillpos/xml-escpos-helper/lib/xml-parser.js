"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLParser = void 0;
const xml_parser_1 = __importDefault(require("xml-parser"));
const buffer_builder_1 = require("./buffer-builder");
const node_factory_1 = require("./node-factory");
class XMLParser {
    parser(xml) {
        let parsedXML = xml_parser_1.default(xml);
        return this.compile(parsedXML);
    }
    compile(parsedXML) {
        let bufferBuilder = new buffer_builder_1.BufferBuilder();
        let rootNode = this.adapter(parsedXML.root, null);
        return rootNode.draw(bufferBuilder);
    }
    adapter(node, parentNode) {
        let xmlNode = node_factory_1.NodeFactory.create(node.name, node);
        if (parentNode)
            parentNode.addChild(xmlNode);
        if (node.children.length > 0) {
            node.children.forEach(child => {
                this.adapter(child, xmlNode);
            });
        }
        return xmlNode;
    }
}
exports.XMLParser = XMLParser;
