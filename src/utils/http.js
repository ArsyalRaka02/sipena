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

    mutasiSiswaById(id) {
        return request().get("/editmutasisiswa?id=" + id)
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
    },
    hapusMutasi(id) {
        return request().get("/hapusmutasisiswa?id=" + id)
    },

    //keuanga
    listKeuanganSpp() {
        return request().get("/keuangan")
    },


    //jadwal

    listJadwalKelas(id) {
        return request().get('/jadwal-kelas?kelas_id=' + id)
    },
    listJadwalKelasGuru(id) {
        return request().get('/jadwal-kelas?mapel_id=' + id)
    },
    listJadwalSekolah() {
        return request().get('/jadwal-sekolah')
    },


    //total kehadiran
    listKehadiran(id) {
        return request().get("/totalabsensiswa?id=" + id)
    },


    //perpus
    katalogBuku() {
        return request().get("/katalog-buku")
    },
    insertKatalogBuku(data) {
        return requestTypeFormData().post("/katalog-buku", data)
    },
    listSumbangBuku() {
        return request().get('/sumbang-buku')
    },
    insertSumbangBuku(data) {
        return requestTypeFormData().post("/sumbang-buku", data)
    },
    deleteSumbangBuku(id) {
        return request().delete("/sumbangbuku/" + id)
    },
    deleteKatalogBuku(id) {
        return request().delete("/katalog-buku/" + id)
    },
    kehilanganBuku() {
        return request().get("/kehilangan-buku")
    },
    insertKehilanganBuku(data) {
        return request().post("/kehilangan-buku", data)
    },
    kategoriBuku() {
        return request().get("/kategori-buku")
    },
    accSumbangbuku(id, pegawai_id) {
        return request.get("/sumbang-buku/acc?id=" + id + "&pegawai_id=" + pegawai_id)
    },
    pinjamBuku(data) {
        return request().post("/pinjam-buku", data)
    },
    kembalikanBuku(id) {
        return request().get("/pinjam-buku?user_id=" + id)
    },


    //pinjam fasilitas
    listPinjamFasilitas(value) {
        return request().get("/pinjam-fasilitas?acc=" + value)
    },
    postAjukanPinjaman(data) {
        return request().post("/pinjam-fasilitas", data)
    },
    accPinjamFasilitas(data) {
        return request().post("/pinjam-fasilitas/acc", data)
    },
    deletedPinjamanFasilitas(id) {
        return request().delete("/pinjam-fasilitas/" + id)
    },

    //top up
    listPengajuanTopUp() {
        return request().get("/approvedompetdigital")
    },
    accPengajuanTopUp(id, status) {
        return request().get("actionapprovedompetdigital?id=" + id + "&status=" + status)
    },

    //list nilai
    listNilaiGet(siswa_id, kelas_id, is_show) {
        return request().get("/nilai-pembelajaran?siswa_id=" + siswa_id + "&kelas_id= " + kelas_id + "&is_show=" + is_show)
    },
    insertNilai(data) {
        return request().post("/nilai-pembelajaran", data)
    },
    AccNilai(kelas_id, semester) {
        return request().get("/nilai-pembelajaran/acc?kelas_id=" + kelas_id + "&semester=" + semester)
    },

    //absen siswa
    listAbsenSiswa() {
        return request().get("/listabsensisiswa")
    },
    insertAbsenSiswa(data) {
        return requestTypeFormData().post("/simpanabsensisiswa", data)
    },

    //absen pegawai
    listAbsenPegawai() {
        return request().get('/listabsensipegawai')
    },
    insertAbsenPegawai(data) {
        return requestTypeFormData().post("/simpanabsensipegawai", data)
    },

    //absen Guru
    listAbsenGuru() {
        return request().get("/requestTypeFormData")
    },
    insertAbsenGuru(data) {
        return requestTypeFormData().post("/simpanabsensiguru", data)
    },

    //dompet
    listDompet() {
        return request().get("/dompetdigital")
    },
    insertDompetTopup(data) {
        return requestTypeFormData().post("/topupdompetdigital", data)
    },

    //fasilitas

    listFasilitas() {
        return request().get("/list-fasilitas")
    },
    insertListFasilitas(data) {
        return request().post("/list-fasilitas", data)
    },
    deletedListFasilitas(id) {
        return request().delete("/list-fasilitas/" + id)
    },

    //kantin
    bayarKantin(data) {
        return request().post('/bayar-kantin', data)
    },
    editKantin(id, keterangan) {
        return request().post("/transaksi-kantin?id=" + id + "&keterangan=" + keterangan)
    },
    deletedKantin(id) {
        return request().delete("/transaksi-kantin/" + id)
    },
    getListKantinbyId(id) {
        return request().get("/kantin?id=" + id)
    },
    getListTransaksiKantin() {
        return request().get("/transaksi-kantin")
    },

    //isisaldouniversal
    kategoriUniversal() {
        return request().get('/kategorikeuangan')
    },
    simpanUniversal(data) {
        return requestTypeFormData().post("/simpankeuangan", data)
    },


    //koperasi
    bayarKoperasi(data) {
        return request().post("/bayar-koperasi", data)
    },
    listTransaksiKoperasi(id) {
        return request().get("/transaksi-koperasi?id=" + id)
    },

    //kartu digital
    getKartuDigital() {
        return request().get("/kartudigital")
    },
    getKartuDigitalById(id) {
        return request().get("/kartudigitalById?id=" + id)
    },


    daftarOsis(id) {
        return request().get("/calon-osis/daftar?id=" + id)
    },
    deletedOsis(id) {
        return request().delete('/kegiatan-osis/' + id)
    },
    inssertOsis(data) {
        return request().post("/kegiatan-osis", data)
    },
    updateOsis(data) {
        return request().post("/kegiatan-osis", data)
    },

    notifikasiTotal(id) {
        return request().get("/total-notifikasi?user_id=" + id)
    },
    getNotifikasi(id) {
        return request().get("/get-notifikasi?user_id=" + id)
    },


    insertActivePPDB(id) {
        return request().get("/ppdb?is_active=" + id)
    },

    deletedKantin(id) {
        return request().delete('/transaksi-kantin/' + id)
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