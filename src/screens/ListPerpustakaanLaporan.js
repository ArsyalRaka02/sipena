import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import NoData from '../components/NoData'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import 'moment/locale/id'  // without this line it didn't work
moment.locale('id')

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPerpustakaanLaporan(props) {
    const navigation = useNavigation()

    const isFocused = useIsFocused()
    const [listBuku, setLiastBuku] = useState([])
    const [listBukuN, setLiastBukuN] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isFocused) {
            loadData()
        }
    }, [isFocused])

    const loadData = useCallback(() => {
        HttpRequest.kembalikanBuku("N").then((res) => {
            // console.log("ini adalah perpus", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                //ambil ketika tidak ada kondisi
                setLiastBuku(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error: " + `${res.data.message}`)
                setLiastBuku([])
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err perpus", err, err.response)
        })
    }, [listBukuN, listBuku])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>List Perpustakaan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listBuku.length == 0 && (
                                <>
                                    <NoData>Tidak ada buku</NoData>
                                </>
                            )
                        }
                        {
                            listBuku.map((item, iPerpus) => {
                                let status = ""
                                let warna = color.black
                                let isWarna = color.black
                                let tanggalA = moment(new Date).locale("id").format("YYYY-MM-DD")
                                let tanggalB = moment(item.tanggal_pengembalian).format("YYYY-MM-DD")
                                if (tanggalA > tanggalB) {
                                    status = "Terlambat"
                                    warna = color.danger
                                    isWarna = color.danger
                                }
                                return (
                                    <>
                                        <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>{item.user_nama}</Text>
                                                <Text style={[{ color: isWarna, fontSize: 14, fontStyle: "italic", fontWeight: "900" }]}>{status}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Jumlah Pinjam : </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{item.jumlah_pinjam} Buku</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Sebagai : </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: color.black }]}>{item.nama_role}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Durasi: </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 14, color: warna, fontStyle: "italic", fontWeight: "900" }]}>{moment(item.tanggal_pengembalian).utc("7").fromNow()}</Text>
                                                </View>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    navigation.navigate("LaporanDetailPerpus", { params: item })
                                                }}>
                                                    <Text style={[styles.txtBoldGlobal, { color: color.primary, fontSize: 14 }]}>Lihat Detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }
                    </ScrollView>
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
    txtBoldGlobal: {
        fontFamily: fonts.interBold,
        fontSize: 15,
        color: color.black
    },
}