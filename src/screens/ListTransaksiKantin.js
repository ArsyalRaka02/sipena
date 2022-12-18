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
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListTransaksiKantin(props) {
    const navigation = useNavigation()

    const [listKantin, setListKantin] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadTransaksiKantin()
    }, [])

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

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Transaksi</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={[styles.txtBoldGlobal, { fontSize: 17, color: color.black, flex: 1 }]}>Pembelian hari ini</Text>
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            navigation.navigate("TransaksiTambahKantin")
                        }} style={{ backgroundColor: color.white, borderRadius: 12 }}>
                            <Text style={[styles.txtBoldGlobal, { color: color.primary, paddingVertical: 8, paddingHorizontal: 30, fontSize: 14 }]}>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {
                            listKantin.length == 0 && (
                                <NoData>Tidak ada transaksi</NoData>
                            )
                        }
                        {
                            listKantin.map((item, iKantin) => {
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
