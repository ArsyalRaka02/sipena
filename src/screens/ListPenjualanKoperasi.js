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
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import { useSelector } from 'react-redux'
import Rupiah from '../utils/Rupiah'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPenjualanKoperasi(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const isFocused = useIsFocused()
    const [detail, setDetail] = useState({})
    const [listKantin, setListKantin] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        if (isFocused) {
            loadTransaksiKoperasi()
        }
        // loadDetail()
    }, [isFocused])

    const loadTransaksiKoperasi = useCallback(() => {
        HttpRequest.getListPembelianKoperasi().then((res) => {
            console.log("ini adalah res kantin", res.data)
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setListKantin(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error list: " + `${res.data.message}`)
                setListKantin([])
            }
            console.log("listPembelian", res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kantin", err, err.response)
        })
    }, [listKantin])

    // const loadDetail = useCallback(() => {
    //     HttpRequest.getListTransaksiKoperasi().then((res) => {
    //         let data = res.data
    //         if (data.status == responseStatus.INSERT_SUKSES) {
    //             setDetail(res.data.data)
    //         }
    //         if (data.status == responseStatus.INSERT_GAGAL) {
    //             Alert.alert("Informasi", "Error detail: " + `${res.data.message}`)
    //         }
    //     }).catch((err) => {
    //         Alert.alert("Informasi", "Server err dari api")
    //         console.log("err kantin", err, err.response)
    //     })
    // }, [detail])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Penjualan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/sipena/tabungan.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Total Penjualan</Text>
                            {/* <Text style={[styles.txtGlobalBold, { fontSize: 18, marginBottom: 6 }]}>{Rupiah.format(detail.saldo)}</Text> */}
                            {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                                navigation.navigate("WithDrawKantin")
                            }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.primary }]}>Withdraw</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                    <View style={{ height: 20 }} />
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
                                                <Text style={[styles.txtGlobalBold, { color: color.black, flex: 1 }]}>{item.nama_barang}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Nominal : </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{Rupiah.format(item.harga_barang)}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", }}>
                                                    <Text style={[styles.txtGlobal]}>Jumlah : </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.jumlah_pembelian}</Text>
                                                </View>
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
}
