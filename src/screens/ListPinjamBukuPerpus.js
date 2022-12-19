import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPinjamBukuPerpus(props) {
    const navigation = useNavigation()

    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listPerpus, setListPerpus] = useState([])
    const [listPerpusY, setListPerpusY] = useState([])

    useEffect(() => {
        if (isFocused) {
            loadTransaksiPerpus()
        }
    }, [isFocused])

    const loadTransaksiPerpus = useCallback(() => {
        HttpRequest.kembalikanBuku("Y").then((res) => {
            console.log("ini adalah perpus", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setListPerpus(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Error: " + `${res.data.message}`)
                setListPerpus([])
            }
        }).catch((err) => {
            Toast.showError("Server Err: ")
            console.log("err perpus", err, err.response)
        })
    }, [listPerpus, user, listPerpusY])

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

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Pinjam Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listPerpus.length == 0 && (
                                <>
                                    <NoData>Tidak ada pinjaman buku</NoData>
                                </>
                            )
                        }
                        {
                            listPerpus.map((item, iPerpus) => {
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