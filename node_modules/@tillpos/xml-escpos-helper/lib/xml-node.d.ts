import { BufferBuilder } from './buffer-builder';
export declare abstract class XMLNode {
    protected attributes: any;
    protected content: string;
    protected children: XMLNode[];
    constructor(node: any);
    addChild(child: XMLNode): void;
    protected getContent(): string;
    abstract open(bufferBuilder: BufferBuilder): BufferBuilder | Promise<BufferBuilder>;
    abstract close(bufferBuilder: BufferBuilder): BufferBuilder;
    draw(bufferBuilder: BufferBuilder): BufferBuilder;
}
