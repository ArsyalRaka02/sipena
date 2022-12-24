import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'
import NoData from '../components/NoData'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListSemuaPeminjamFasilitas(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [listPeminjamanFasilitas, setListPeminjamanFasilitas] = useState([])

    useEffect(() => {
        if (isFocused) {
            myFunction()
        }
    }, [isFocused])

    const myFunction = async () => {
        loadPinjamanFasilitas()
    };

    const loadPinjamanFasilitas = useCallback(() => {
        HttpRequest.listPinjamFasilitas(1).then((res) => {
            let result = res.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListPeminjamanFasilitas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListPeminjamanFasilitas([])
            }
            console.log("res", result)
        }).catch((err) => {
            console.log("ini adalah list beita", err, err.response)
        })
    }, [listPeminjamanFasilitas])

    const btnDeleteFasilitas = useCallback((value) => {
        HttpRequest.deletedPinjamanFasilitas(value).then((res) => {
            let result = res.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Alert.alert("Informasi", "Berhasil Akhiri Peminjaman")
                loadPinjamanFasilitas()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "gagal hapus" + `${result.message}`)
            }
            // Toast.showSuccess("Berhasil Tolak Peminjaman")
            // setListPeminjamanFasilitas(result)
            console.log("suske", result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listPeminjamanFasilitas])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tata Usaha</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 80, width: 80, marginRight: 16, borderRadius: 50, padding: 14, backgroundColor: color.primaryRGBA, overflow: 'hidden' }}>
                            <Image source={require("../assets/sipena/osis.png")} style={{ height: "100%", width: "100%", tintColor: color.primary }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Permintaan Peminjaman</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Beberapa orang mungkin sedang menunggu menggunakan fasilitas</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                navigation.navigate("ListPermintaanFasilitasTU")
                            }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13, marginVertical: 12, color: color.primary }]}>Lihat Sekarang</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        {
                            listPeminjamanFasilitas.length == 0 && (
                                <NoData>Tidak ada data</NoData>
                            )
                        }
                        {
                            listPeminjamanFasilitas.length > 0 && (
                                listPeminjamanFasilitas.map((item, iList) => {
                                    return (
                                        <>
                                            <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>{item.user_nama}</Text>
                                                    <Text style={[styles.txtBoldGlobal, { color: color.black }]}>{item.role_nama}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                                        <Text style={[styles.txtGlobal]}>Hari : </Text>
                                                        <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{moment(item.tanggal).format("dddd")}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", flex: 1, alignItems: 'center' }}>
                                                        <Text style={[styles.txtGlobal]}>tanggal : </Text>
                                                        <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{moment(item.tanggal).format("DD MMM YYYY")}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
                                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                                        <Text style={[styles.txtGlobal]}>Jam Selesai : </Text>
                                                        <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{item.jam_selesai}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: "row", flex: 1 }}>
                                                        <Text style={[styles.txtGlobal]}>Fasilitas : </Text>
                                                        <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{item.nama_fasilitas}</Text>
                                                    </View>
                                                </View>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    btnDeleteFasilitas(item.id)
                                                }}>
                                                    <Text style={[styles.txtGlobal, { color: color.primary }]}>Akhiri Peminjaman</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ height: 20 }} />
                                        </>
                                    )
                                })
                            )
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
    txtBoldGlobal: {
        fontFamily: fonts.interBold,
        fontSize: 15,
        color: color.black
    },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
}

