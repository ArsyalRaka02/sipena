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
import { useNavigation } from '@react-navigation/native';
import BottomTab from '../components/ButtomTab';
import { HttpRequest } from '../utils/http';
import NoData from '../components/NoData';
import responseStatus from '../utils/responseStatus';
import Toast from '../components/Toast';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Dashboard(props) {
    const navigation = useNavigation()
    const [isOpenCard, setisOpenCard] = useState(false)

    const [listJadwal, setListJadwal] = useState([])
    const [listBerita, setListBerita] = useState([])

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
            page: "ListJadwal"
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
            page: "ListKoperasi"
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink,
            page: "DashboardSemuaList"
        }
    ]

    useEffect(() => {
        loadListJadwal()
        loadBerita()
    }, [])

    const loadListJadwal = useCallback(async () => {
        try {
            let data = await HttpRequest.listMataPelajaran()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal mendapatkan list jadwal")
                setListJadwal([])
            }
            console.log("ini adalah jadwal matapelajaran", result)
        } catch (error) {
            console.log("err", error, error.response)
        }
    }, [listJadwal])

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
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listBerita])

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
                    />
                    <View style={{ zIndex: 1 }}>
                        <View style={styles.menuDashboard}>
                            {
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
                            }
                        </View>
                    </View>

                    <View style={{ paddingHorizontal: 20 }}>
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
                                    return (
                                        <>
                                            <View style={styles.containerJadwal}>
                                                <Text style={[styles.txtBoldGlobal]}>{item.nama}</Text>
                                                <View style={{ flex: 1 }} />
                                                <Ionicons name="time-outline" size={24} color={color.black} />
                                                <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>Jam Belum diketahui</Text>
                                            </View>
                                            <View style={{ height: 20 }} />
                                        </>
                                    )
                                })
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
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                {
                                    listBerita.length > 0 && (
                                        listBerita.map((item, iBerita) => {
                                            return (
                                                <>
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
        marginTop: -90,
        // top: 90,
        // position: "absolute",
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderRadius: 12,
    },
    menuChild: {
        width: SCREEN_WIDTH / 5,
        // backgroundColor: color.primary,
        justifyContent: 'center',
        marginVertical: 7,
        alignItems: 'center',

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