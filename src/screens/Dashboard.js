import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView, StatusBar, Linking, Alert } from 'react-native';
import HeaderTablet from '../components/HeaderTablet';
import app from '../config/app';
import { fonts } from '../utils/fonts';
import color from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BottomTab from '../components/ButtomTab';
import { HttpRequest } from '../utils/http';
import NoData from '../components/NoData';
import responseStatus from '../utils/responseStatus';
import Toast from '../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import RoleResponse from '../utils/RoleResponse';
import Rupiah from '../utils/Rupiah'

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Dashboard(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [isOpenCard, setisOpenCard] = useState(false)

    const [listJadwal, setListJadwal] = useState([])
    const [listSekolah, setListSekolah] = useState([])
    const [listBerita, setListBerita] = useState([])
    const [listKantin, setListKantin] = useState([])
    const [listPerpus, setListPerpus] = useState([])
    const [listPerpusY, setListPerpusY] = useState([])
    const [listKoperasi, setListKoperasi] = useState([])
    // const [obj, setObj] = useState({})
    const [listPeminjamanFasilitas, setListPeminjamanFasilitas] = useState([])
    const [detail, setDetail] = useState({})

    const btnOpenCard = useCallback(() => {
        setisOpenCard(!isOpenCard)
    }, [isOpenCard])

    const btnCloseCard = useCallback(() => {
        setisOpenCard(!isOpenCard)
    }, [isOpenCard])

    const data = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenuSiswa"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsen"
        },
        {
            name: "Keuangan",
            image: require("../assets/sipena/Frame.png"),
            warna: color.menuPurple,
            page: "ListKeuangan"
        },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "RaportMurid"
        },
        {
            name: "Pinjam Fasilitas",
            image: require("../assets/sipena/pinjam.png"),
            warna: color.menuOrange,
            page: "ListPinjamFasilitas"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaan"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    const dataKantin = [
        // {
        //     name: "Perpustakaan",
        //     image: require("../assets/sipena/perpus.png"),
        //     warna: color.menuBlueOrca,
        //     page: "ListPerpustakaan"
        // },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "KantinMenu"
        },

        {

        },
        {

        },
    ]

    const dataTU = [
        // {
        //     name: "Jadwal",
        //     image: require("../assets/sipena/jadwal.png"),
        //     warna: color.menuBlue,
        //     page: "ListJadwalMenu"
        // },
        {
            name: "Tata usaha",
            image: require("../assets/sipena/TU.png"),
            warna: color.menuPurple,
            page: "ListTataUsaha"
        },
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenPegawai"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "Pinjam Fasilitas",
            image: require("../assets/sipena/pinjam.png"),
            warna: color.menuOrange,
            page: "ListPinjamFasilitas"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsenMonitoring"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaan"
        },
        {
            name: "PPDB",
            image: require("../assets/sipena/ppdb.png"),
            warna: color.menuBlue,
            page: "ListPPDBMenu"
        },
    ]

    const dataPerpus = [
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenPegawai"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListMenuPerpustakaan"
        },
        // {
        //     name: "Keuangan",
        //     image: require("../assets/sipena/Frame.png"),
        //     warna: color.menuPurple,
        //     page: "ListKeuangan"
        // },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
    ]

    const dataWaliMurid = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenu"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "TotalKehadiranMuridWali"
        },
        {
            name: "Keuangan",
            image: require("../assets/sipena/Frame.png"),
            warna: color.menuPurple,
            page: "ListKeuanganWaliMurid"
        },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "RaportMuridWali"
        },
        {
            name: "Mutasi",
            image: require("../assets/sipena/mutasi.png"),
            warna: color.menuPink,
            page: "ListMutasi"
        },
        {

        },
        {

        },
        {

        },

    ]

    const waliMuridNonSiswa = [
        {
            name: "PPDB",
            image: require("../assets/sipena/ppdb.png"),
            warna: color.menuBlue,
            page: "https://sipena.wapfive.com/ppdb-register"
        },
        {

        },
        {

        },
        {

        },
    ]

    const guru = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenuGuru"
        },
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenGuru"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsenMonitoring"
        },
        {
            name: "Penilaian",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "ListMenuPenilaian"
        },
        {
            name: "Pinjam Fasilitas",
            image: require("../assets/sipena/pinjam.png"),
            warna: color.menuOrange,
            page: "ListPinjamFasilitas"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    const GuruEsktra = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenuGuru"
        },
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenGuru"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsenMonitoring"
        },
        {
            name: "Pinjam Fasilitas",
            image: require("../assets/sipena/pinjam.png"),
            warna: color.menuOrange,
            page: "ListPinjamFasilitas"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "Ekstrakulikuler",
            image: require("../assets/sipena/ekstra.png"),
            warna: color.menuRed,
            page: "ListEkstrakulikuler"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    const guruWali = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenuGuru"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsenMonitoring"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaan"
        },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "ListMenuPenilaian"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenGuru"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    const dataDinas7 = [
        // {
        //     name: "Koperasi Sekolah",
        //     image: require("../assets/sipena/koperasi.png"),
        //     warna: color.menuBrown,
        //     // page: "ListKoperasi"
        //     page: "QrCodeKoperasi"
        // },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "RaportRole7"
        },
        {
            name: "PPDB",
            image: require("../assets/sipena/ppdb.png"),
            warna: color.menuBlue,
            page: "ListPPDBMenu"
        },
        {
            name: "Keuangan Sekolah",
            image: require("../assets/sipena/Frame.png"),
            warna: color.menuPurple,
            page: "KeuanganSPPTU"
        },
        {
            name: "Mutasi",
            image: require("../assets/sipena/mutasi.png"),
            warna: color.menuPink,
            page: "ListMutasiSiswaPengawas"
        },
        {
            name: "Ekstrakulikuler",
            image: require("../assets/sipena/ekstra.png"),
            warna: color.menuRed,
            page: "ListEkstrakulikuler"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaanLaporan"
        },
        {
            name: "List",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListLaporan"
        },
        {
            name: "Kartu Digital",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListKartuPelajarTU"
        },
        // {
        //     name: "Kantin",
        //     image: require("../assets/sipena/kantin.png"),
        //     warna: color.menuGreen,
        //     page: "QrCodeKantin"
        // },
    ]
    const dataKepalaSekolah = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalKepalaSekolah"
        },
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenKepalaSekolah"
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsenMonitoring"
        },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "RaportRole7"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "PPDB",
            image: require("../assets/sipena/ppdb.png"),
            warna: color.menuBlue,
            page: "ListPPDBMenu"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    const dataPengawasSekolah = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalKepalaSekolah"
        },
        // {
        //     name: "Absen",
        //     image: require("../assets/sipena/user33.png"),
        //     warna: color.menuRed,
        //     page: "ListAbsenPegawai"
        // },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen,
            page: "ListAbsenMonitoring"
        },
        {
            name: "Absen Pegawai",
            image: require("../assets/sipena/user-8.png"),
            warna: color.menuPink,
            page: "ListAbsenMonitoringPegawai"
        },
        {
            name: "PPDB",
            image: require("../assets/sipena/ppdb.png"),
            warna: color.menuBlue,
            page: "ListPPDBMenu"
        },
        {
            name: "Mutasi",
            image: require("../assets/sipena/mutasi.png"),
            warna: color.menuPink,
            page: "ListMutasiSiswaPengawas"
        },
        {
            name: "Keuangan Sekolah",
            image: require("../assets/sipena/Frame.png"),
            warna: color.menuPurple,
            page: "KeuanganSPPTU"
        },
        // {
        //     name: "Koperasi Sekolah",
        //     image: require("../assets/sipena/koperasi.png"),
        //     warna: color.menuBrown,
        //     // page: "ListKoperasi"
        //     page: "QrCodeKoperasi"
        // },
        // {
        //     name: "Kantin",
        //     image: require("../assets/sipena/kantin.png"),
        //     warna: color.menuGreen,
        //     page: "QrCodeKantin"
        // },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        },
        {

        }
    ]

    const dataKoperasi = [
        {
            name: "Absen",
            image: require("../assets/sipena/user33.png"),
            warna: color.menuRed,
            page: "ListAbsenPegawai"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaan"
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "ListMenuKoperasi"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
    ]

    useEffect(() => {
        if (isFocused) {
            loadProfile()
            if (user.role_id == RoleResponse.kepalasekolah) {
                loadJadwalSekolah()
                loadBeritaSekolah()
            }
            if (user.role_id == RoleResponse.dinaspendidikan) {
                loadBeritaSekolah()
            }
            if (user.role_id == RoleResponse.guru) {
                if (user.data.is_walikelas == "Y") {
                    loadBerita()
                }
                if (user.data.is_walikelas != "Y") {
                    loadBeritaSekolah()
                }
                loadListJadwalGuru()
            }
            if (user.role_id == RoleResponse.siswa) {
                // loadListJadwal()
                loadListJadwalBaru()
                loadBerita()
            }
            if (user.role_id == RoleResponse.walimurid) {
                // loadJadwalSekolah()
                loadBerita()
                loadListJadwalWalimurid()
            }
            if (user.role_id == RoleResponse.pegawai) {
                if (user.data.is_kantin == "Y") {
                    loadTransaksiKantin()
                }
                if (user.data.is_perpus == "Y") {
                    loadTransaksiPerpus()
                }
                if (user.data.is_tata_usaha == "Y") {
                    loadPinjamanFasilitas()
                }
                if (user.data.is_koperasi == "Y") {
                    loadTransaksiKoperasi()
                }
                loadBeritaSekolah()
            }
        }
    }, [user, isFocused])

    const loadTransaksiKoperasi = useCallback(() => {
        HttpRequest.getListPembelianKoperasi().then((res) => {
            console.log("ini adalah res kantin", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setListKoperasi(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error list: " + `${res.data.message}`)
                setListKoperasi([])
            }
            console.log("listPembelian", res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kantin", err, err.response)
        })
    }, [listKoperasi])

    const loadListJadwalBaru = useCallback(() => {
        let id = user?.data?.kelas_id
        HttpRequest.jadwalBaruPerhariByKelas(id).then((res) => {
            // let result = res.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                // let day = moment(new Date()).format("dddd")
                // let resDay = Object.keys(res.data.data)
                // if (result.Rabu == day) {
                setListJadwal(res.data.data)
                // }
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
                setListJadwal([])
            }
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listJadwal])

    const loadListJadwalWalimurid = useCallback(() => {
        let id = user.siswa[0].kelas_id
        HttpRequest.jadwalBaruPerhariByKelas(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
            console.log("list", res.data)
        }).catch((err) => {
            console.log("err jadwal", err, err.response)
            setListJadwal([])
        })
    }, [listJadwal])

    const loadTransaksiKantin = useCallback(() => {
        HttpRequest.getListTransaksiKantin().then((res) => {
            console.log("ini adalah res kantin", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setListKantin(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Error: " + `${res.data.message}`)
                setListKantin([])
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kantin", err, err.response)
        })
    }, [listKantin])

    const loadTransaksiPerpus = useCallback(() => {
        HttpRequest.kembalikanBuku("Y").then((res) => {
            // console.log("ini adalah perpus", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                //ambil ketika tidak ada kondisi
                setListPerpus(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Error: " + `${res.data.message}`)
                setListPerpus([])
                setListPerpusY([])
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err perpus", err, err.response)
        })
    }, [listPerpus, user, listPerpusY])

    const loadListJadwal = useCallback(() => {
        let id = user?.data?.kelas_id
        HttpRequest.listJadwalKelas(id).then((res) => {
            let result = res.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
                setListJadwal([])
            }
            console.log("ini adalah jadwal matapelajaran", result)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listJadwal])

    const loadListJadwalGuru = useCallback(() => {
        if (user.role_id == RoleResponse.guru) {
            if (user.data.is_mapel == "Y") {
                let id = user.maper.id
                HttpRequest.listJadwalKelasGuruByMapel(id).then((res) => {
                    let status = res.data.status
                    if (status == responseStatus.INSERT_SUKSES) {
                        setListSekolah(res.data.data)
                    }
                    if (status == responseStatus.INSERT_GAGAL) {
                        Alert.alert("Informasi", `${res.data.message}`)
                        setListSekolah([])
                    }
                    console.log("ini adalah guru", res.data)
                }).catch((err) => {
                    console.log("err jadwal", err, err.response)
                    setListSekolah([])
                })
            }
            // if (user.data.is_walikelas == "Y") {
            //     let id = user.kelas.id
            //     HttpRequest.listJadwalKelas(id).then((res) => {
            //         let status = res.data.status
            //         if (status == responseStatus.INSERT_SUKSES) {
            //             setListSekolah(res.data.data)
            //         }
            //         if (status == responseStatus.INSERT_GAGAL) {
            //             Alert.alert("Informasi", `${res.data.message}`)
            //             setListSekolah([])
            //         }
            //     }).catch((err) => {
            //         console.log("err jadwal", err, err.response)
            //         setListSekolah([])
            //     })
            // }
            // if (user.data.is_walikelas == "Y" && user.data.is_mapel == "Y") {
            //     let id = user.kelas.id
            //     HttpRequest.listJadwalKelas(id).then((res) => {
            //         let status = res.data.status
            //         if (status == responseStatus.INSERT_SUKSES) {
            //             setListSekolah(res.data.data)
            //         }
            //         if (status == responseStatus.INSERT_GAGAL) {
            //             Alert.alert("Informasi", `${res.data.message}`)
            //             setListSekolah([])
            //         }
            //     }).catch((err) => {
            //         console.log("err jadwal", err, err.response)
            //         setListSekolah([])
            //     })
            // }
        }
        // HttpRequest.listJadwalSekolah().then((res) => {
        //     let status = res.data.status
        //     if (status == responseStatus.INSERT_SUKSES) {
        //         setListSekolah(res.data.data)
        //     }
        //     if (status == responseStatus.INSERT_GAGAL) {
        //         Alert.alert("Informasi", `${res.data.message}`)
        //         setListSekolah([])
        //     }
        // }).catch((err) => {
        //     Alert.alert("Informasi", "Server Err : ")
        //     console.log("err", err, err.response)
        // })
    }, [listSekolah])

    const loadBerita = useCallback(async () => {
        try {
            let data = await HttpRequest.listBerita("kelas")
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBerita(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBerita([])
            }
            // console.log("res", data.data.data)
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listBerita])

    const loadBeritaSekolah = useCallback(async () => {
        try {
            let data = await HttpRequest.listBerita("sekolah")
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBerita(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBerita([])
            }
            // console.log("res", result)
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listBerita])

    const loadJadwalSekolah = useCallback(() => {
        HttpRequest.listJadwalSekolah().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Error: " + `${result.message}`)
            }
            console.log("sekolah", res.data.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [listJadwal])

    const loadPinjamanFasilitas = useCallback(async () => {
        try {
            let data = await HttpRequest.listPinjamFasilitas(1)
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListPeminjamanFasilitas(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListPeminjamanFasilitas([])
            }
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listPeminjamanFasilitas])

    const btnDeleteFasilitas = useCallback((value) => {
        HttpRequest.deletedPinjamanFasilitas(value).then((res) => {
            // let result = res.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                // Toast.showSuccess("")
                Alert.alert("Informasi", "Berhasil Akhiri Peminjaman")
                loadPinjamanFasilitas()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("gagal hapus" + `${result.message}`)
            }
            // console.log("suske", result)
            // setListPeminjamanFasilitas(result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listPeminjamanFasilitas])

    const btnDeleteTransaksiKantin = useCallback((value) => {
        HttpRequest.deletedKantin(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Alert.alert("Informasi", "Berhasil Hapus Transaksi")
                // Toast.showSuccess("")
                loadTransaksiKantin()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("gagal hapus" + `${result.message}`)
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listKantin])

    const btnDeletePerpus = useCallback((value) => {
        HttpRequest.deletedPinjamanBuku(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Alert.alert("Informasi", "Berhasil tolak pinjam buku")
                loadTransaksiPerpus()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("gagal hapus" + `${res.data.message}`)
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listPerpus, listPerpusY])

    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let result = res.data.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("gagal hapus" + `${res.data.message}`)
                setDetail({})
            }
            // console.log("user s ", result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [detail])

    const btnTriggerView = useCallback((value, iJenis, item) => {
        let id = value
        let kategori_id = iJenis
        HttpRequest.listBeritaByID(id, kategori_id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                let isJenis = ""
                if (user.role_id == RoleResponse.siswa) {
                    isJenis = "kelas"
                }
                if (user.role_id == RoleResponse.walimurid) {
                    isJenis = "kelas"
                }

                if (user.role_id == RoleResponse.guru) {
                    if (user.data.is_walikelas == "Y") {
                        isJenis = "kelas"
                    }
                    if (user.data.is_walikelas != "Y") {
                        isJenis = "sekolah"
                    }
                }
                if (user.role_id == RoleResponse.pegawai) {
                    isJenis = "sekolah"
                }
                if (user.role_id == RoleResponse.kepalasekolah) {
                    isJenis = "sekolah"
                }
                if (user.role_id == RoleResponse.dinaspendidikan) {
                    isJenis = "sekolah"
                }
                return navigation.navigate("DetailBerita", { params: item, jenis: isJenis })
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
        }).catch((err) => {
            console.llog("err", err, err.response)
            Alert.alert("Informasi", "Server err dari api")
        })
    }, [user])

    const btnKoperasiDelete = useCallback((value) => {
        HttpRequest.deleteListPembelianKoperasi(value).then((res) => {
            Alert.alert("Informasi", "Berhasil")
            loadTransaksiKoperasi()
        }).catch((err) => {
            Alert.alert("Informasi", "Kesalahan di server api")
        })
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color.primary} barStyle='light-content' />
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <HeaderTablet
                        textHeader={app.NAME}
                        textProfile={styles.txtProfile}
                        textAlamat={styles.txtProfile}
                        // iconProfile={() => {
                        //     navigation.navigate("Profile")
                        // }}
                        iconRight={() => {
                            navigation.navigate("Notification")
                        }}
                    />
                    <View style={{ zIndex: 1 }}>
                        <View style={[styles.menuDashboard]}>
                            {
                                user.role_id == RoleResponse.admin && (
                                    data.map((item, ilist) => {
                                        return (
                                            <>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    if (item.page != "") {
                                                        navigation.navigate(item.page)
                                                    }
                                                }} style={styles.menuChild}>
                                                    <View style={[styles.menuIcon, {
                                                        backgroundColor: item.warna,
                                                    }]}>
                                                        <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                    </View>
                                                    <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })
                                )
                            }
                            {
                                user.role_id == RoleResponse.siswa && (
                                    data.map((item, ilist) => {
                                        return (
                                            <>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    if (item.page != "") {
                                                        navigation.navigate(item.page)
                                                    }
                                                }} style={[styles.menuChild, {}]}>
                                                    <View style={[styles.menuIcon, {
                                                        backgroundColor: item.warna,
                                                    }]}>
                                                        <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                    </View>
                                                    <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })
                                )
                            }
                            {
                                user.role_id == RoleResponse.guru && (
                                    <>
                                        {
                                            user.data.is_walikelas == "Y" && user.data.is_mapel == "Y" && (
                                                guruWali.map((item, iMenu) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            user.data.is_walikelas == "N" && user.data.is_mapel == "Y" && (
                                                guru.map((item, iMenu) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            user.data.is_walikelas == "N" && user.data.is_mapel == "N" && user.data.is_ekstrakulikuler == "Y" && (
                                                GuruEsktra.map((item, iMenu) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                    </>
                                )
                            }

                            {
                                user.role_id == RoleResponse.walimurid && (
                                    <>
                                        {
                                            user.siswa.length != 0 && (
                                                dataWaliMurid.map((item, ilist) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            user.siswa.length == 0 && (
                                                waliMuridNonSiswa.map((item) => {
                                                    return (
                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                            Linking.openURL(item.page)
                                                        }} style={[styles.menuChild]}>
                                                            <View style={[styles.menuIcon, {
                                                                backgroundColor: item.warna,
                                                            }]}>
                                                                <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                            </View>
                                                            <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                user.role_id == RoleResponse.pegawai && (
                                    <>
                                        {
                                            detail.is_perpus == "Y" && (
                                                dataPerpus.map((item, iMenu) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            detail.is_tata_usaha == "Y" && (
                                                dataTU.map((item, iMenu) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            detail.is_kantin == "Y" && (
                                                dataKantin.map((item, ilist) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            detail.is_pengawas_sekolah == "Y" && (
                                                dataPengawasSekolah.map((item, ilist) => {
                                                    return (
                                                        <>
                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                if (item.page != "") {
                                                                    navigation.navigate(item.page)
                                                                }
                                                            }} style={styles.menuChild}>
                                                                <View style={[styles.menuIcon, {
                                                                    backgroundColor: item.warna,
                                                                }]}>
                                                                    <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                                </View>
                                                                <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                            </TouchableOpacity>
                                                        </>
                                                    )
                                                })
                                            )
                                        }
                                        {
                                            detail.is_koperasi == "Y" && (
                                                dataKoperasi.map((item) => {
                                                    return (
                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                            if (item.page != "") {
                                                                navigation.navigate(item.page)
                                                            }
                                                        }} style={styles.menuChild}>
                                                            <View style={[styles.menuIcon, {
                                                                backgroundColor: item.warna,
                                                            }]}>
                                                                <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                            </View>
                                                            <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                user.role_id == RoleResponse.dinaspendidikan && (
                                    dataDinas7.map((item, iMenu) => {
                                        return (
                                            <>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    if (item.page != "") {
                                                        navigation.navigate(item.page)
                                                    }
                                                }} style={styles.menuChild}>
                                                    <View style={[styles.menuIcon, {
                                                        backgroundColor: item.warna,
                                                    }]}>
                                                        <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                    </View>
                                                    <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })
                                )
                            }
                            {
                                user.role_id == RoleResponse.kepalasekolah && (
                                    dataKepalaSekolah.map((item, iMenu) => {
                                        return (
                                            <>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    if (item.page != "") {
                                                        navigation.navigate(item.page)
                                                    }
                                                }} style={styles.menuChild}>
                                                    <View style={[styles.menuIcon, {
                                                        backgroundColor: item.warna,
                                                    }]}>
                                                        <Image source={item.image} style={{ width: 18, height: 18 }} />
                                                    </View>
                                                    <Text style={{ textAlign: 'center', fontSize: 10, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                                </TouchableOpacity>
                                            </>
                                        )
                                    })
                                )
                            }
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 20 }}>
                        {
                            user.role_id != RoleResponse.pegawai && (
                                <>
                                    {
                                        user.role_id == RoleResponse.walimurid && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Jadwal hari ini</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListJadwal")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>


                                                <View style={{ marginVertical: 12 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                </View>
                                                {
                                                    listJadwal.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada jadwal</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listJadwal.length > 0 && (
                                                        listJadwal.map((item, iJadwal) => {
                                                            if (iJadwal < 3) {
                                                                return (
                                                                    <>
                                                                        {/* <Text style={[styles.txtBoldGlobal, { fontSize: 16, color: color.black, marginBottom: 12 }]}>{item.jadwal_hari}</Text> */}
                                                                        <View style={styles.containerJadwal}>
                                                                            <Text style={[styles.txtBoldGlobal]}>{item.mapel_nama}</Text>
                                                                            <View style={{ flex: 1 }} />
                                                                            <Ionicons name="time-outline" size={24} color={color.black} />
                                                                            <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                                        </View>
                                                                        <View style={{ height: 20 }} />
                                                                    </>
                                                                )
                                                            }
                                                        })
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        user.role_id == RoleResponse.guru && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Jadwal hari ini</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListJadwalGuru")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{ marginVertical: 12 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                </View>
                                                {
                                                    listSekolah.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada jadwal kelas</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listSekolah.length > 0 && (
                                                        <>
                                                            {
                                                                listSekolah.map((item, iJadwal) => {
                                                                    if (iJadwal < 3) {
                                                                        return (
                                                                            <>
                                                                                {/* <Text style={[styles.txtBoldGlobal, { fontSize: 16, color: color.black, marginBottom: 12 }]}>{item.jadwal_hari}</Text> */}
                                                                                <View style={styles.containerJadwal}>
                                                                                    <Text style={[styles.txtBoldGlobal]}>{item.kelas_nama}</Text>
                                                                                    <View style={{ flex: 1 }} />
                                                                                    <Ionicons name="time-outline" size={24} color={color.black} />
                                                                                    <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                                                </View>
                                                                                <View style={{ height: 20 }} />
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </>

                                                    )
                                                }
                                            </>

                                        )
                                    }
                                    {
                                        user.role_id == RoleResponse.siswa && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Jadwal hari ini</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListJadwalSiswa")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginVertical: 12 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                </View>
                                                {
                                                    listJadwal.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada jadwal</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listJadwal.length > 0 && (
                                                        <>
                                                            {
                                                                listJadwal.map((item, iJadwal) => {
                                                                    if (iJadwal < 3) {
                                                                        return (
                                                                            <>
                                                                                <View style={styles.containerJadwal}>
                                                                                    <Text style={[styles.txtBoldGlobal]}>{item.mapel_nama}</Text>
                                                                                    <View style={{ flex: 1 }} />
                                                                                    <Ionicons name="time-outline" size={24} color={color.black} />
                                                                                    <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                                                </View>
                                                                                <View style={{ height: 20 }} />
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        user.role_id == RoleResponse.kepalasekolah && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Jadwal hari ini</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListJadwalKepalaSekolah")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    listJadwal.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada jadwal</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listJadwal.length > 0 && (
                                                        <>
                                                            {/* <View style={{ marginVertical: 12 }}>
                                                                <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                            </View> */}
                                                            {
                                                                listJadwal.map((item, iJadwal) => {
                                                                    if (iJadwal < 3) {
                                                                        return (
                                                                            <>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 16, color: color.black, marginBottom: 12 }]}>{item.jadwal_hari}</Text>
                                                                                <View style={styles.containerJadwal}>
                                                                                    <Text style={[styles.txtBoldGlobal]}>{item.kegiatan}</Text>
                                                                                    <View style={{ flex: 1 }} />
                                                                                    <Ionicons name="time-outline" size={24} color={color.black} />
                                                                                    <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jam_mulai} - {item.jam_selesai}</Text>
                                                                                </View>
                                                                                <View style={{ height: 20 }} />
                                                                            </>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </>

                                                    )
                                                }
                                            </>

                                        )
                                    }
                                </>
                            )
                        }
                        {
                            user.role_id == RoleResponse.pegawai && (
                                <>
                                    {
                                        detail.is_perpus == "Y" && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Pinjam Buku</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListPinjamBukuPerpus")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    listPerpus.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada pinjaman buku</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listPerpus.map((item, iPerpus) => {
                                                        if (iPerpus < 3) {
                                                            return (
                                                                <>
                                                                    <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>{item.user_nama}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Jumlah Pinjam : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{item.jumlah_pinjam} Buku</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Sebagai : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{item.nama_role}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                navigation.navigate("DetailPinjamBuku", { params: item })
                                                                            }}>
                                                                                <Text style={[styles.txtBoldGlobal, { color: color.primary, fontSize: 14 }]}>Lihat Detail</Text>
                                                                            </TouchableOpacity>
                                                                            <View style={{ flex: 1 }} />
                                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                btnDeletePerpus(item.id)
                                                                            }}>
                                                                                <Text style={[styles.txtBoldGlobal, { color: color.danger, fontSize: 14 }]}>Hapus</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ height: 20 }} />
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        detail.is_tata_usaha == "Y" && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Fasilitas Sedang Dipakai</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListSemuaPeminjamFasilitas")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    listPeminjamanFasilitas.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada fasilitas</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listPeminjamanFasilitas.map((item, iFasilitas) => {
                                                        if (iFasilitas < 1) {
                                                            return (
                                                                <>
                                                                    <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>Nama</Text>
                                                                            <Text style={[styles.txtBoldGlobal, { color: color.black }]}>Osis</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Hari : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{moment(item.tanggal).format("dddd")}</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>tanggal : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{moment(item.tanggal).format("DD MMM YYYY")}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Jam Selesai : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{item.jam_selesai}</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Fasilitas : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{item.nama_fasilitas}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                            btnDeleteFasilitas(item.id)
                                                                        }}>
                                                                            <Text style={[styles.txtGlobal, { color: color.primary }]}>Akhiri Peminjaman</Text>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    <View style={{ height: 20 }} />
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        detail.is_kantin == "Y" && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Transaksi Masuk hari ini</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListTransaksiKantin")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    listKantin.length == 0 && (
                                                        <NoData>Tidak ada transaksi</NoData>
                                                    )
                                                }
                                                {
                                                    listKantin.map((item, iKantin) => {
                                                        if (iKantin < 3) {
                                                            return (
                                                                <>
                                                                    <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>{item.keterangan}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Nominal : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{Rupiah.format(item.harga_total)}</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Pembeli : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{item.nama_pembeli}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                navigation.navigate("TransaksiEditKantin", { params: item })
                                                                            }}>
                                                                                <Text style={[styles.txtBoldGlobal, { color: color.primary, fontSize: 14 }]}>Edit</Text>
                                                                            </TouchableOpacity>
                                                                            <View style={{ flex: 1 }} />
                                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                btnDeleteTransaksiKantin(item.id)
                                                                            }}>
                                                                                <Text style={[styles.txtBoldGlobal, { color: color.danger, fontSize: 14 }]}>Hapus</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ height: 20 }} />
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                    {
                                        detail.is_koperasi == "Y" && (
                                            <>
                                                <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>Pembelian hari ini</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("ListSemuaPenjualan")
                                                    }}>
                                                        <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                {
                                                    listKoperasi.length == 0 && (
                                                        <NoData>Tidak ada transaksi</NoData>
                                                    )
                                                }
                                                {
                                                    listKoperasi.map((item, iKantin) => {
                                                        if (iKantin < 3) {
                                                            return (
                                                                <>
                                                                    <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>{item.nama_barang}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                                            <View style={{ flexDirection: "row", flex: 1 }}>
                                                                                <Text style={[styles.txtGlobal]}>Nominal : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{Rupiah.format(item.harga_barang)}</Text>
                                                                            </View>
                                                                            <View style={{ flexDirection: "row", }}>
                                                                                <Text style={[styles.txtGlobal]}>Jumlah : </Text>
                                                                                <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{item.jumlah_pembelian}</Text>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                navigation.navigate("EditPenjualan", { params: item })
                                                                            }}>
                                                                                <Text style={[styles.txtBoldGlobal, { color: color.primary }]}>Edit</Text>
                                                                            </TouchableOpacity>
                                                                            <View style={{ flex: 1 }} />
                                                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                btnKoperasiDelete(item.id)
                                                                            }}>
                                                                                <Text style={[styles.txtBoldGlobal, { color: color.danger }]}>Tolak</Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ height: 20 }} />
                                                                </>
                                                            )
                                                        }
                                                    })
                                                }
                                            </>
                                        )
                                    }
                                </>
                            )

                        }

                        {/* <View style={styles.containerJadwal}>
                            <Text style={[styles.txtBoldGlobal]}>Matematika</Text>
                            <View style={{ flex: 1 }} />
                            <Ionicons name="time-outline" size={24} color={color.black} />
                            <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>01.00 - 02.00</Text>
                        </View>
                        <View style={{ height: 20 }} />
                        <View style={styles.containerJadwal}>
                            <Text style={[styles.txtBoldGlobal]}>Bahasa Indonesia</Text>
                            <View style={{ flex: 1 }} />
                            <Ionicons name="time-outline" size={24} color={color.black} />
                            <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>01.00 - 02.00</Text>
                        </View>
                        <View style={{ height: 20 }} />
                        <View style={styles.containerJadwal}>
                            <Text style={[styles.txtBoldGlobal]}>Bahasa Inggris</Text>
                            <View style={{ flex: 1 }} />
                            <Ionicons name="time-outline" size={24} color={color.black} />
                            <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>01.00 - 02.00</Text>
                        </View> */}

                        {/* fasilitas */}
                        {/* <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Text style={[styles.txtBoldGlobal]}>Fasilitas Sedang Dipakai</Text>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                navigation.navigate("ListSemuaPeminjamFasilitas")
                            }}>
                                <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>Nama</Text>
                                <Text style={[styles.txtBoldGlobal, { color: color.black }]}>Osis</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Hari : </Text>
                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>hari ini</Text>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>tanggal : </Text>
                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>tanggal ini</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Pukul : </Text>
                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>pukul ini</Text>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Fasilitas : </Text>
                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>fasilitas ini</Text>
                                </View>
                            </View>
                            <Text style={[styles.txtGlobal, { color: color.primary }]}>Akhiri Peminjaman</Text>
                        </View> */}

                        {/* transaksi */}


                        <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                            <Text style={[styles.txtBoldGlobal]}>Berita</Text>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                if (user.role_id == RoleResponse.siswa) {
                                    navigation.navigate("ListBerita")
                                }
                                if (user.role_id == RoleResponse.walimurid) {
                                    navigation.navigate("ListBerita")
                                }

                                if (user.role_id == RoleResponse.guru) {
                                    if (user.data.is_walikelas == "Y") {
                                        navigation.navigate("ListBerita")
                                    }
                                    if (user.data.is_walikelas != "Y") {
                                        navigation.navigate("ListBeritaSekolah")
                                    }
                                }
                                if (user.role_id == RoleResponse.pegawai) {
                                    navigation.navigate("ListBeritaSekolah")
                                }
                                if (user.role_id == RoleResponse.kepalasekolah) {
                                    navigation.navigate("ListBeritaSekolah")
                                }
                                if (user.role_id == RoleResponse.dinaspendidikan) {
                                    navigation.navigate("ListBeritaSekolah")
                                }
                            }}>
                                <Text style={[styles.txtGlobal, { color: "#75B4FF" }]}>Selengkapnya</Text>
                            </TouchableOpacity>
                        </View>

                        {/* berita */}
                        {/* <View style={{ flexDirection: 'row' }}> */}
                        {
                            listBerita.length == 0 && (
                                <>
                                    <NoData>Tidak ada berita</NoData>
                                </>
                            )
                        }
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {
                                    listBerita.length > 0 && (
                                        listBerita.map((item, iBerita) => {
                                            return (
                                                <>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        let isJenis = ""
                                                        if (user.role_id == RoleResponse.siswa) {
                                                            isJenis = "kelas"
                                                        }
                                                        if (user.role_id == RoleResponse.walimurid) {
                                                            isJenis = "kelas"
                                                        }

                                                        if (user.role_id == RoleResponse.guru) {
                                                            if (user.data.is_walikelas == "Y") {
                                                                isJenis = "kelas"
                                                            }
                                                            if (user.data.is_walikelas != "Y") {
                                                                isJenis = "sekolah"
                                                            }
                                                        }
                                                        if (user.role_id == RoleResponse.pegawai) {
                                                            isJenis = "sekolah"
                                                        }
                                                        if (user.role_id == RoleResponse.kepalasekolah) {
                                                            isJenis = "sekolah"
                                                        }
                                                        if (user.role_id == RoleResponse.dinaspendidikan) {
                                                            isJenis = "sekolah"
                                                        }
                                                        btnTriggerView(item.id, isJenis, item)
                                                    }} style={{ backgroundColor: color.white, padding: 8, width: SCREEN_WIDTH / 2.0, flexDirection: 'column', borderRadius: 12 }}>
                                                        <View style={{ height: SCREEN_HEIGHT / 7, overflow: 'hidden', borderRadius: 12 }}>
                                                            <Image source={{ uri: app.BASE_URL_PICTURE + item.foto }} style={styles.img} resizeMode="cover" />
                                                        </View>
                                                        <View style={{ marginVertical: 12 }}>
                                                            <Text style={[styles.txtBoldGlobal, { marginBottom: 6 }]}>{item.judul} </Text>

                                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                                                <Text style={[styles.txtGlobal]}>{moment(item.tanggal).format("DD MMMM YYYY")}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                                <Ionicons name="eye-outline" size={18} color={color.black} style={{ marginRight: 8, alignSelf: 'flex-start' }} />
                                                                <Text numberOfLines={2} style={[styles.txtGlobal]}>{item.total_views}</Text>
                                                            </View>
                                                            {
                                                                item.kelas_id != null && (
                                                                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                                        <Ionicons name="book-outline" size={18} color={color.black} style={{ marginRight: 8, alignSelf: 'flex-start' }} />
                                                                        <Text numberOfLines={2} style={[styles.txtGlobal]}>{item.kelas_nama}</Text>
                                                                    </View>
                                                                )
                                                            }
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ width: 20 }} />
                                                </>
                                            )
                                        })
                                    )
                                }
                            </View>
                            {/*                                 
                                <View style={{ backgroundColor: color.white, padding: 8, width: SCREEN_WIDTH / 2.0, flexDirection: 'column', borderRadius: 12 }}>
                                    <View style={{ height: SCREEN_HEIGHT / 7, overflow: 'hidden', borderRadius: 12 }}>
                                        <Image source={require("../assets/sipena/candi-penataran.png")} style={styles.img} resizeMode="cover" />
                                    </View>
                                    <View style={{ marginVertical: 12 }}>
                                        <Text style={[styles.txtBoldGlobal, { marginBottom: 6 }]}>judul Berita</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                            <Ionicons name="eye-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                            <Text style={[styles.txtGlobal]}>Vision berita</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                            <Ionicons name="time-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                            <Text style={[styles.txtGlobal]}>Tanggal berita</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ width: 20 }} />
                                <View style={{ backgroundColor: color.white, padding: 8, width: SCREEN_WIDTH / 2.0, flexDirection: 'column', borderRadius: 12 }}>
                                    <View style={{ height: SCREEN_HEIGHT / 7, overflow: 'hidden', borderRadius: 12 }}>
                                        <Image source={require("../assets/sipena/candi-penataran.png")} style={styles.img} resizeMode="cover" />
                                    </View>
                                    <View style={{ marginVertical: 12 }}>
                                        <Text style={[styles.txtBoldGlobal, { marginBottom: 6 }]}>judul Berita</Text>
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                            <Ionicons name="eye-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                            <Text style={[styles.txtGlobal]}>Vision berita</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                            <Ionicons name="time-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                            <Text style={[styles.txtGlobal]}>Tanggal berita</Text>
                                        </View>
                                    </View>
                                </View> */}
                        </ScrollView>
                        {/* </View> */}
                    </View>
                    <View style={{ height: 40 }} />
                </ScrollView>
                <BottomTab selected={0} onClick={(event) => {
                    navigation.navigate(event)
                }} />
            </View >
        </View >
    );
}

const styles = {
    container: {
        backgroundColor: "transparent",
        flex: 1,
    },
    img: {
        with: "100%",
        height: "100%"
    },
    mainContainer: {
        backgroundColor: color.primary,
        borderRadius: 18,
    },
    headerMain: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.whiteColorRgba,
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    txtHeaderWhite: {
        fontSize: 14,
        color: color.white
    },
    txtProfile: {
        fontSize: 13,
        fontFamily: fonts.inter,
        color: color.white
    },
    menuDashboard: {
        marginHorizontal: 20,
        backgroundColor: color.white,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: -90,
        // top: 90,
        // position: "absolute",
        justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 12,
    },
    menuChild: {
        width: SCREEN_WIDTH / 5.2,
        // flex: 1,
        justifyContent: 'center',
        alignContent: 'space-between',
        alignItems: 'center',
        // alignItems: 'center',
        // backgroundColor: color.primary,
        marginVertical: 7,

    },
    menuIcon: {
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    txtGlobal: {
        fontFamily: fonts.inter,
        fontSize: 13,
        color: color.black
    },
    txtBoldGlobal: {
        fontFamily: fonts.interBold,
        fontSize: 15,
        color: color.black
    },
    containerJadwal: {
        flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, padding: 14, alignItems: 'center'
    }
}