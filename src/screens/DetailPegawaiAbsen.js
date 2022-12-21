import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'
import app from '../config/app'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailPegawaiAbsen(props) {
    const navigation = useNavigation()

    const { params } = props.route.params

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {

    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 16, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={[styles.txtGlobal]}>Nama : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.nama_lengkap ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={[styles.txtGlobal]}>Alasan : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.alasan_izin ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={[styles.txtGlobal]}>Keterangan Izin: </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.keterangan_izin ?? "Tidak izin"}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={[styles.txtGlobal]}>Status Pegawai : </Text>
                            {
                                params.is_kantin == "Y" && (
                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>Kantin</Text>
                                )
                            }
                            {
                                params.is_koperasi == "Y" && (
                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>Kantin</Text>
                                )
                            }
                            {
                                params.is_perpus == "Y" && (
                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>Perpustakaan</Text>
                                )
                            }
                            {
                                params.is_tata_usaha == "Y" && (
                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>Tata Usaha</Text>
                                )
                            }
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={[styles.txtGlobal]}>Terlambat : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.terlambat == "Y" ? "Terlambat" : "Tepat Waktu" ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, flex: 1 }]}>Foto Absen</Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{moment(params.waktu).format("dddd, DD-MM-YYYY")}</Text>
                        </View>
                        <View style={{ height: SCREEN_HEIGHT / 3, overflow: 'hidden' }}>
                            <Image source={{ uri: app.BASE_URL_PICTURE + params.foto }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    txtHeader: {
        fontSize: 18,
        color: color.white,
        fontFamily: fonts.interBold,
    },
    txtGlobal: { fontSize: 13, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
    containerText: {
        flex: 1,
        paddingHorizontal: 10
    },
}
