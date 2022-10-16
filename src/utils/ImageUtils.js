import { HttpUtils } from "./http";

export default {
    getSafeImage(url) {
        if (url) {
            return { uri: HttpUtils.normalizeUrl(url) };
        }
        return require("../assets/images/no-image.png");
    },
    getSafeImageUrl(url) {
        if (url) {
            return HttpUtils.normalizeUrl(url);
        }
        return "https://via.placeholder.com/150";
    }
}