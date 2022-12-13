import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image, ScrollView, StatusBar } from 'react-native';
import HeaderTablet from '../components/HeaderTablet';
import app from '../config/app';
import { fonts } from '../utils/fonts';
import color from '../utils/color';
import { useNavigation } from '@react-navigation/native';
import HeaderBack from '../components/HeaderBack';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function DashboardSemuaList(props) {
    const navigation = useNavigation()
    const [isOpenCard, setisOpenCard] = useState(false)

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
            name: "Kantin",
            image: require("../assets/sipena/kantin.png"),
            warna: color.menuGreen,
            page: ""
        },
        {
            name: "Osis",
            image: require("../assets/sipena/osis.png"),
            warna: color.menuBlue,
            page: "ListOsis"
        },
        {
            name: "Mutasi",
            image: require("../assets/sipena/mutasi.png"),
            warna: color.menuPink,
            page: "ListMutasi"
        },
        {
            name: "Ekstrakulikuler",
            image: require("../assets/sipena/ekstra.png"),
            warna: color.menuRed,
            page: "ListEkstrakulikuler"
        },
    ]

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={color.primary} barStyle='light-content' />
            <HeaderBack
                onBack={() => {
                    navigation.goBack()
                }}
            >
                <Text style={styles.txtHeader}>List Semua Menu</Text>
            </HeaderBack>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <View style={{ height: 20 }} />
                    <View style={{ flexDirection: 'column', paddingHorizontal: 20 }}>
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
                                            <View style={{ width: 20 }} />
                                            <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: fonts.inter, flex: 1, textAlign: 'left' }}>{item.name}</Text>
                                        </TouchableOpacity>
                                        <View style={styles.underline} />
                                    </>
                                )
                            })
                        }
                    </View>
                </ScrollView>
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
        justifyContent: 'center',
        marginVertical: 7,
        alignItems: 'center',
        flexDirection: 'row',
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
        fontSize: 14,
        color: color.black
    },
    txtBoldGlobal: {
        fontFamily: fonts.interBold,
        fontSize: 17,
        color: color.black
    },
    containerJadwal: {
        flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, padding: 14, alignItems: 'center'
    },
    txtHeader: {
        fontSize: 18,
        color: color.white,
        fontFamily: fonts.interBold,
    },
    underline: {
        borderBottomWidth: 0.8, borderBottomColor: color.gray, marginVertical: 12
    },
}