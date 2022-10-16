import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';
export default class TextLineNode extends XMLNode {
    private textNode;
    constructor(node: any);
    open(bufferBuilder: BufferBuilder): BufferBuilder;
    close(bufferBuilder: BufferBuilder): BufferBuilder;
}
