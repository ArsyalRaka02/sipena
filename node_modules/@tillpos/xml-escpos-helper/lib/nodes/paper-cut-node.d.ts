import { XMLNode } from '../xml-node';
import { BufferBuilder } from '../buffer-builder';
export default class PaperCutNode extends XMLNode {
    constructor(node: any);
    open(bufferBuilder: BufferBuilder): BufferBuilder;
    close(bufferBuilder: BufferBuilder): BufferBuilder;
}
