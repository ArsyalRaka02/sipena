declare class Image {
    pixels: any;
    data: any;
    constructor(pixels: any);
    /**
     * [description]
     * @return {[type]}     [description]
     */
    get size(): {
        width: any;
        height: any;
        colors: any;
    };
    /**
     * [toBitmap description]
     * @param  {[type]} density [description]
     * @return {[type]}         [description]
     */
    toBitmap(density: any): {
        data: any[];
        density: any;
    };
    /**
     * [toRaster description]
     * @return {[type]} [description]
     */
    toRaster(): {
        data: any[];
        width: number;
        height: any;
    };
}
export default Image;
