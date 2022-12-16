import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import DatePicker from '../components/DatePicker'
import Button from '../components/Button'
import { user } from '../store/reducers'
import { HttpRequest } from '../utils/http'
import { useSelector } from 'react-redux'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function EditKegiatanOsis(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    const user = useSelector(state => state.user);
    const [judul, setJudul] = useState("")
    const [tanggalPinjaman, setTanggalPinjaman] = useState(new Date())
    const [jamAwal, setJamAwal] = useState(moment(new Date()).format("HH:mm"))
    const [jamAkhir, setJamAkhir] = useState(moment(new Date()).format("HH:mm"))
    const [isLoading, setIsloading] = useState(false)

    const toggleSetDay = useCallback((day) => {
        setTanggalPinjaman(day)
    }, [tanggalPinjaman])

    const toggleSetWaktuAwal = useCallback((day) => {
        setJamAwal(day)
    }, [jamAwal])

    const toggleSetWaktuAkhir = useCallback((day) => {
        setJamAkhir(day)
    }, [jamAkhir])

    useEffect(() => {
        loadDetail()
    }, [])

    const loadDetail = useCallback(() => {
        setJudul(params.kegiatan)
    }, [judul, jamAkhir, jamAwal, tanggalPinjaman])

    const btnSave = useCallback(() => {
        let data = {
            id: params.id,
            kegiatan: judul,
            jam_mulai: jamAwal,
            jam_selesai: jamAkhir,
            pelaksana: user.data.nama_lengkap,
            tanggal: moment(tanggalPinjaman).format("YYYY-MM-DD")
        }
        // console.log("da", data)
        HttpRequest.updateOsis(data).then((res) => {
            console.log("res", res.data)
            setTimeout(() => {
                navigation.goBack()
            }, 300);
        }).catch((err) => {
            Toast.showError("Server Error: ")
        })
    }, [judul, jamAkhir, jamAwal, tanggalPinjaman])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Edit Kegiatan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Judul</Text>
                        <TextInputIcon
                            value={judul}
                            onChangeText={setJudul}
                        />
                        <View style={{ height: 20 }} />
                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Tanggal Pinjaman</Text>
                        <DatePicker
                            style={{ backgroundColor: color.white }}
                            format='YYYY-MM-DD'
                            displayFormat='DD MMM YYYY'
                            nameLabel="tanggal"
                            value={tanggalPinjaman}
                            onChange={(tanggal) => {
                                toggleSetDay(tanggal)
                            }}
                        />

                        <View style={{ height: 20 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Jam Mulai</Text>
                                <DatePicker
                                    style={{ backgroundColor: color.white }}
                                    mode="time"
                                    format='HH:ss'
                                    displayFormat='HH:ss'
                                    nameLabel="jam mulai"
                                    value={jamAwal}
                                    onChange={(tanggal) => {
                                        toggleSetWaktuAwal(tanggal)
                                    }}
                                />
                            </View>
                            <View style={{ width: 20 }} />
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Jam Akhir</Text>
                                <DatePicker
                                    style={{ backgroundColor: color.white }}
                                    mode="time"
                                    format='HH:ss'
                                    displayFormat='HH:ss'
                                    nameLabel="jam akhir"
                                    value={jamAkhir}
                                    onChange={(tanggal) => {
                                        toggleSetWaktuAkhir(tanggal)
                                    }}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button
                        loading={isLoading} activeOpacity={1} onPress={() => {
                            btnSave()
                        }}>
                        Simpan
                    </Button>
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
}
