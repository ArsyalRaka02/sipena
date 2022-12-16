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

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Dashboard(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [isOpenCard, setisOpenCard] = useState(false)

    const [listJadwal, setListJadwal] = useState([])
    const [listBerita, setListBerita] = useState([])
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
            page: "ListJadwalMenu"
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
            page: "ListRaport"
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
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: "QrCodeKantin"
        },
    ]

    const dataTU = [
        {
            name: "Jadwal",
            image: require("../assets/sipena/jadwal.png"),
            warna: color.menuBlue,
            page: "ListJadwalMenu"
        },
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

    useEffect(() => {
        loadBerita()
        loadProfile()
        loadPinjamanFasilitas()
        loadListJadwal()
    }, [user])

    // useEffect(() => {
    //     if (user.roleid == RoleResponse.pegawai) {
    //         return loadPinjamanFasilitas()
    //     }
    //     if (user.roleid != RoleResponse.pegawai) {
    //         return loadListJadwal()
    //     }
    // }, [])

    const loadListJadwal = useCallback(() => {
        HttpRequest.listJadwalKelas(user.data.kelas_id).then((res) => {
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
    }, [listJadwal, detail])

    const loadBerita = useCallback(async () => {
        try {
            let data = await HttpRequest.listBerita("kelas")
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBerita(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBerita([])
            }
            console.log("res", result)
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listBerita])


    const loadPinjamanFasilitas = useCallback(async () => {
        try {
            let data = await HttpRequest.listPinjamFasilitas(1)
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListPeminjamanFasilitas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListPeminjamanFasilitas([])
            }
            console.log("res", result)
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listPeminjamanFasilitas])

    const btnDeleteFasilitas = useCallback((value) => {
        HttpRequest.deletedPinjamanFasilitas(value).then((res) => {
            let result = res.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil Akhiri Peminjaman")
                loadPinjamanFasilitas()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal hapus" + `${result.message}`)
            }
            console.log("suske", result)
            // setListPeminjamanFasilitas(result)
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listPeminjamanFasilitas])

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
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 20 }}>
                        {
                            user.role_id != RoleResponse.pegawai && (
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
                                                            <Text style={[styles.txtBoldGlobal, { fontSize: 16, color: color.black, marginBottom: 12 }]}>{item.jadwal_hari}</Text>
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
                            user.role_id == RoleResponse.pegawai && (
                                <>
                                    {/* {
                                        detail.is_koperasi == "Y" && (
                                            <>

                                            </>
                                        )
                                    }
                                    {
                                        detail.is_perpus == "Y" && (
                                            <>

                                            </>
                                        )
                                    } */}
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

                                                <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>Nama</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                        <View style={{ flexDirection: "row", flex: 1 }}>
                                                            <Text style={[styles.txtGlobal]}>Nominal : </Text>
                                                            <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>-</Text>
                                                        </View>
                                                        <View style={{ flexDirection: "row", flex: 1 }}>
                                                            <Text style={[styles.txtGlobal]}>Pembeli : </Text>
                                                            <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>-</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Text style={[styles.txtBoldGlobal, { color: color.primary, fontSize: 14 }]}>Edit</Text>
                                                        <View style={{ flex: 1 }} />
                                                        <Text style={[styles.txtBoldGlobal, { color: color.danger, fontSize: 14 }]}>Hapus</Text>
                                                    </View>
                                                </View>
                                                <View style={{ height: 20 }} />
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