import { BufferBuilder } from './buffer-builder';
export declare class TemplateParser {
    private mustache;
    constructor();
    parser(template: any, scope: any): BufferBuilder;
}
