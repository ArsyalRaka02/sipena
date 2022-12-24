import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import Button from '../components/Button'
import Rupiah from '../utils/Rupiah'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailKoperasi(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);

    const { params } = props.route.params
    const [detail, setDetail] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [arr, setArr] = useState([])


    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        HttpRequest.listTransaksiKoperasi(params).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setDetail(res.data.data)
                setArr(res.data.data.list)
            } else {
                Alert.alert("Informasi", "error get detail kantin" + `${res.data.data.message}`)
            }
            console.log("ers", res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [user, params, detail, arr])

    const btnSave = useCallback(() => {
        let data = {
            koperasi_transaksi_id: detail.koperasi_transaksi_id,
            user_id: user.data.id
        }
        setIsLoading(true)
        HttpRequest.bayarKoperasi(data).then((res) => {
            // Toast.showSuccess("Berhasil Bayar Koperasi")
            // setTimeout(() => {
            //     navigation.popToTop()
            // }, 300);
            Alert.alert("Informasi", "Berhasil", [
                {
                    text: "Oke", onPress: () => {
                        setTimeout(() => {
                            navigation.popToTop()
                        }, 300);
                    }
                }
            ])
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert("Informasi", "error dari rest api")
        })
    }, [user, detail])


    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Bayar Koperasi</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Total Pembayaran</Text>
                                <Text style={[styles.txtGlobal, { fontSize: 13 }]}>{Rupiah.format(detail.total_pembayaran)}</Text>
                            </View>
                        </View>
                        <View style={{ height: 20 }} />
                        {
                            arr.map((item, Ilist) => {
                                return (
                                    <>
                                        <View style={{ padding: 12, flexDirection: "column", borderRadius: 12, backgroundColor: color.white, borderRadius: 12 }}>
                                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>Nama Barang : {item.nama}</Text>
                                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>Jumlah : {item.jumlah_pembelian} qty</Text>
                                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>harga : {item.total_harga}</Text>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button
                        loading={isLoading} activeOpacity={1} onPress={() => {
                            btnSave()
                        }}>
                        Bayar Sekarang
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
