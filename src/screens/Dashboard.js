import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ImageBackground, Image } from 'react-native';
import HeaderTablet from '../components/HeaderTablet';
import app from '../config/app';
import { fonts } from '../utils/fonts';
import color from '../utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Dashboard(props) {

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
            warna: color.menuBlue
        },
        {
            name: "Absen Siswa",
            image: require("../assets/sipena/absen.png"),
            warna: color.menuGreen
        },
        {
            name: "Keuangan",
            image: require("../assets/sipena/Frame.png"),
            warna: color.menuPurple
        },
        {
            name: "Rapot",
            image: require("../assets/sipena/rapot.png"),
            warna: color.menuYellow
        },
        {
            name: "Pinjam Fasilitas",
            image: require("../assets/sipena/pinjam.png"),
            warna: color.menuOrange
        },
        {
            name: "Perpustakaan",
            image: require("../assets/sipena/perpus.png"),
            warna: color.menuBlueOrca
        },
        {
            name: "Koperasi Sekolah",
            image: require("../assets/sipena/koperasi.png"),
            warna: color.menuBrown
        },
        {
            name: "Semua",
            image: require("../assets/sipena/semua.png"),
            warna: color.menuPink
        }
    ]

    return (
        <View style={styles.container}>
            <HeaderTablet
                textHeader={app.NAME}
                textProfile={styles.txtProfile}
                textAlamat={styles.txtProfile}
            />

            <View style={styles.menuDashboard}>
                {
                    data.map((item, ilist) => {
                        return (
                            <>
                                <View style={styles.menuChild}>
                                    <View style={[styles.menuIcon, {
                                        backgroundColor: item.warna,
                                    }]}>
                                        <Image source={item.image} style={{ width: 18, height: 18 }} />
                                    </View>
                                    <Text style={{ textAlign: 'center', fontSize: 12, fontFamily: fonts.inter, marginVertical: 12, flex: 1 }}>{item.name}</Text>
                                </View>
                            </>
                        )
                    })
                }
            </View>
        </View >
    );
}

const styles = {
    container: {
        backgroundColor: "transparent",
        flex: 1,
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
        // marginTop: -95,
        top: 90,
        position: "absolute",
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
    }
}