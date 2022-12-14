import axios from "axios";
import FormData from "form-data";
import qs from 'qs';
import { Platform } from "react-native";
import AppConfig from "../config/app";
import { store } from "../store";

axios.defaults.xsrfCookieName = 'OTHERCOOKIE';
axios.defaults.xsrfHeaderName = "X-OTHERNAME";
axios.defaults.withCredentials = false;

const request = () => {
    return axios.create({
        baseURL: AppConfig.BASE_URL,
        timeout: AppConfig.TIMEOUT,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    });
}

const requestTypeFormData = () => {
    return axios.create({
        baseURL: AppConfig.BASE_URL,
        timeout: AppConfig.TIMEOUT,
        headers: {
            "content-type": "multipart/form-data"
        }
    });
}

const requestWithAuth = (useFormData = false) => {
    // let user = store.getState().user;
    // console.log("Token", user.token);

    return axios.create({
        baseURL: AppConfig.BASE_URL,
        timeout: AppConfig.TIMEOUT,
        headers: {
            "Accept": "application/json",
            "Content-Type": (useFormData ? "application/x-www-form-urlencoded" : "application/json"),
            // "token": user.token,
        }
    });
}

export const HttpRequest = {
    login(data) {
        return request().post("/login", data);
    },

    getProfile(id) {
        return request().get('/profile?id=' + id)
    },

    mutasiSiswaPost(data) {
        return requestTypeFormData().post("/simpanmutasisiswa", data)
    },
    listMutasiSiswa() {
        return request().get("/iistmutasisiswa")
    },

    listMataPelajaran() {
        return request().get("/mata-pelajaran")
    },
    listMapel() {
        return request().get("/kelas")
    },

    listKegiatanOsis() {
        return request().get("/kegiatan-osis")
    },
    listBerita(kategori, id) {
        return request().get("/berita?kategori=" + kategori)
    }

};

export const FormDataConverter = {
    convert(data) {
        let form_data = new FormData();

        for (let key in data) {
            form_data.append(key, data[key]);
        }

        return form_data;
    }
};

export const HttpUtils = {
    normalizeUrl(url) {
        if (url != null) {
            return url.substr(0, url.indexOf("?"));
        }
        return null;
    }
};

export const HttpResponse = {
    processMessage(msg, alternateMessage = "Error processing data") {
        if (msg) {
            let data = msg.data;
            let messages = [];
            Object.keys(data).forEach((key) => {
                let arr = data[key];
                if (Array.isArray(arr)) {
                    messages.push(key + " - " + arr.join(" "));
                } else {
                    messages.push(key + " - " + arr);
                }
            });
            if (messages.length == 0) {
                return alternateMessage;
            }
            return messages.join(" ");
        }
        return alternateMessage;
    }
};