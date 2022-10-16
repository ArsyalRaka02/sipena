import { BufferBuilder } from './buffer-builder';
export declare class EscPos {
    static getBufferFromTemplate(template: string, data: any): number[];
    static getBufferFromXML(xml: string): number[];
    static getBufferBuilder(): BufferBuilder;
}
