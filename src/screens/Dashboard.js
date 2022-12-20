import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView, StatusBar } from 'react-native';
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
            page: "ListAbsen"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaan"
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
            page: "ListTotalKehadiran"
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
            page: "ListRaport"
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
            page: "ListRaport"
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
            page: "RaportWaliKelas"
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
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown,
            // page: "ListKoperasi"
            page: "QrCodeKoperasi"
        },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "RaportRole7"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
    ]
    const dataKepalaSekolah = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenuGuru"
        },
        // {
        //     name: "Absen",
        //     image: require("../assets/sipena/user33.png"),
        //     warna: color.menuRed,
        //     page: "ListAbsenKepalaSekolah"
        // },
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
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow,
            page: "RaportRole7"
        },
        {
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca,
            page: "ListPerpustakaan"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    useEffect(() => {
        if (isFocused) {
            loadBerita()
            loadProfile()
            if (user.role_id == RoleResponse.kepalasekolah) {
                loadJadwalSekolah()
            }
            if (user.role_id == RoleResponse.guru) {
                loadListJadwalGuru()
            }
            if (user.role_id == RoleResponse.siswa) {
                loadListJadwal()
            }
            if (user.role_id == RoleResponse.walimurid) {
                loadJadwalSekolah()
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
            }
        }
    }, [user, isFocused])

    const loadTransaksiKantin = useCallback(() => {
        HttpRequest.getListTransaksiKantin().then((res) => {
            console.log("ini adalah res kantin", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setListKantin(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Error: " + `${res.data.message}`)
                setListKantin([])
            }
        }).catch((err) => {
            Toast.showError("Server Err: ")
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
                Toast.showError("Error: " + `${res.data.message}`)
                setListPerpus([])
                setListPerpusY([])
            }
        }).catch((err) => {
            Toast.showError("Server Err: ")
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
                Toast.showError("Gagal mendapatkan list jadwal")
                setListJadwal([])
            }
            console.log("ini adalah jadwal matapelajaran", result)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listJadwal])

    const loadListJadwalGuru = useCallback(() => {
        // HttpRequest.listJadwalSekolah().then((res) => {
        //     let status = res.data.status
        //     if (status == responseStatus.INSERT_SUKSES) {
        //         setListSekolah(res.data.data)
        //     }
        //     if (status == responseStatus.INSERT_GAGAL) {
        //         Toast.showError("Gagal mendapatkan list jadwal")
        //         setListSekolah([])
        //     }
        // }).catch((err) => {
        //     Toast.showError("Server Err : ")
        //     console.log("err", err, err.response)
        // })
        let id = user.kelas.id
        HttpRequest.listJadwalKelas(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListSekolah(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal mendapatkan list jadwal")
                setListSekolah([])
            }
        }).catch((err) => {
            console.log("err jadwal", err, err.response)
            setListSekolah([])
        })
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
                Toast.showError("Error: " + `${result.message}`)
            }
            console.log("sekolah", res.data.data)
        }).catch((err) => {
            Toast.showError("Server error: ")
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
                Toast.showSuccess("Berhasil Akhiri Peminjaman")
                loadPinjamanFasilitas()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal hapus" + `${result.message}`)
            }
            // console.log("suske", result)
            // setListPeminjamanFasilitas(result)
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listPeminjamanFasilitas])

    const btnDeleteTransaksiKantin = useCallback((value) => {
        HttpRequest.deletedKantin(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil Hapus Transaksi")
                loadTransaksiKantin()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal hapus" + `${result.message}`)
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listKantin])

    const btnDeletePerpus = useCallback((value) => {
        HttpRequest.deletedPinjamanBuku(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil tolak pinjam buku")
                loadTransaksiPerpus()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal hapus" + `${res.data.message}`)
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
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
                Toast.showError("Gagal status == 2")
                setDetail([])
            }
            // console.log("user s ", result)
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [detail])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color.primary} barStyle='light-content' />
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <HeaderTablet
                        textHeader={app.NAME}
                        textProfile={styles.txtProfile}
                        textAlamat={styles.txtProfile}
                        iconProfile={() => {
                            navigation.navigate("Profile")
                        }}
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
                                user.role_id == RoleResponse.guru && (
                                    <>
                                        {
                                            user.data.is_walikelas == "Y" && (
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
                                            user.data.is_walikelas != "Y" && (
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
                                    </>
                                )
                            }

                            {
                                user.role_id == RoleResponse.walimurid && (
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
                                                {
                                                    listSekolah.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada jadwal</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listSekolah.length > 0 && (
                                                        <>
                                                            <View style={{ marginVertical: 12 }}>
                                                                <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                            </View>
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
                                                            <View style={{ marginVertical: 12 }}>
                                                                <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                            </View>
                                                            {
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
                                navigation.navigate("ListBerita")
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
                                                        navigation.navigate("DetailBerita", { params: item, jenis: "kelas" })
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
                                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                                                                <Ionicons name="book-outline" size={18} color={color.black} style={{ marginRight: 8, alignSelf: 'flex-start' }} />
                                                                <Text numberOfLines={2} style={[styles.txtGlobal]}>{item.kelas_id}</Text>
                                                            </View>
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
        // justifyContent: 'center',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 12,
    },
    menuChild: {
        width: SCREEN_WIDTH / 5,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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