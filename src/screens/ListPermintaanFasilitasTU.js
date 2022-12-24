import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPermintaanFasilitasTU(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const isFocused = useIsFocused()
    const [listPeminjamanFasilitas, setListPeminjamanFasilitas] = useState([])
    const [detail, setDetail] = useState([])

    useEffect(() => {
        if (isFocused) {
            loadPinjamanFasilitas()
        }
        if (user) {
            loadProfile()
        }
    }, [isFocused, user])

    const loadPinjamanFasilitas = useCallback(async () => {
        try {
            let data = await HttpRequest.listPinjamFasilitas(0)
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListPeminjamanFasilitas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListPeminjamanFasilitas([])
            }
            console.log("res", result)
        } catch (error) {
            console.log("ini adalah list beita", error)
        }
    }, [listPeminjamanFasilitas])

    const btnDeleteFasilitas = useCallback((value) => {
        HttpRequest.deletedPinjamanFasilitas(value).then((res) => {
            let result = res.data
            // let status = res.data.status
            // if (status == responseStatus.DELETE_SUKSES) {

            // }
            // if (status == responseStatus.DELETE_GAGAL) {
            //     Alert.alert("Informasi", "gagal hapus status == 2")
            //     setListPeminjamanFasilitas([])
            // }
            Alert.alert("Informasi", "Berhasil Tolak Peminjaman")
            setListPeminjamanFasilitas(result)
            console.log("suske", result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listPeminjamanFasilitas])

    const btnSetujui = useCallback((value) => {
        let data = {
            id: value,
            pegawai_id: detail.id
        }
        HttpRequest.accPinjamFasilitas(data).then((res) => {
            let result = res.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                // setListPeminjamanFasilitas(result)
                Alert.alert("Informasi", "Sukses: " + `${res.data.message}`)
                setTimeout(() => {
                    navigation.goBack()
                }, 300);
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error: " + `${res.data.message}`)
                // setListPeminjamanFasilitas([])
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
        })
    }, [detail, listPeminjamanFasilitas])

    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let result = res.data.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
                setDetail([])
            }
            // console.log("user s ", result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [detail])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Permintaan Peminjaman</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listPeminjamanFasilitas.length == 0 && (
                                <NoData>Tidak ada data fasilitas</NoData>
                            )
                        }
                        {
                            listPeminjamanFasilitas.map((item, iList) => {
                                return (
                                    <>
                                        <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.txtBoldGlobal, { color: color.black, flex: 1 }]}>{item.user_nama}</Text>
                                                <Text style={[styles.txtBoldGlobal, { color: color.black }]}>{item.role_nama}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Hari : </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{moment(item.tanggal).format("dddd")}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>tanggal : </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{moment(item.tanggal).format("DD MMM YYYY")}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Jam Selesai : </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{item.jam_selesai}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Fasilitas : </Text>
                                                    <Text style={[styles.txtBoldGlobal, { fontSize: 12, color: color.black }]}>{item.nama_fasilitas}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    btnSetujui(item.id)
                                                }}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Setujui</Text>
                                                </TouchableOpacity>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    btnDeleteFasilitas(item.id)
                                                }}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.danger }]}>Tolak</Text>
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
