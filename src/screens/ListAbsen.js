import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListAbsen(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [listJadwal, setListJadwal] = useState([])

    useEffect(() => {
        loadListJadwal()
    }, [user])

    const loadListJadwal = useCallback(() => {
        let id = user.data.kelas_id
        if (id == "") {
            return Toast.showError("tidak mendapatkan id kelas")
        }
        HttpRequest.listJadwalKelas(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal mendapatkan list jadwal")
                setListJadwal([])
            }
            // console.log("ini adalah jadwal matapelajaran", result)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listJadwal])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Absen</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/images/warning.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Lakukan absen sesuai dengan jadwal hari ini!</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Absensi menggunakan Foto Selfi</Text>
                        </View>
                    </View>

                    <View style={{ height: 20 }} />

                    <View style={{ flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 16 }}>
                        <Text style={[styles.txtGlobalBold, { color: color.black }]}>Total Kehadiran</Text>
                        <View style={{ flex: 1 }} />
                        <TouchableOpacity activeOpacity={1} onPress={() => {
                            navigation.navigate("ListTotalKehadiran")
                        }}>
                            <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Lihat Sekarang</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        {
                            listJadwal.map((item, iList) => {
                                return (
                                    <>
                                        <Text style={[styles.txtBoldGlobal, { fontSize: 16, color: color.black, marginBottom: 12 }]}>{item.jadwal_hari}</Text>
                                        <View style={[styles.containerJadwal]}>
                                            <Text style={[styles.txtBoldGlobal]}>{item.mapel_nama}</Text>
                                            <View style={{ flex: 1 }} />
                                            <View style={{ flexDirection: 'column' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="time-outline" size={24} color={color.black} />
                                                    <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                </View>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    navigation.navigate("DetailAbsen", { params: item.id })
                                                }}>
                                                    <Text style={[styles.txtGlobalBold, { marginLeft: 12, textAlign: 'right', color: color.primary }]}>Absen Sekarang</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }
                        {/* <View style={{ flexDirection: 'column', backgroundColor: color.white, borderRadius: 8, padding: 14, marginVertical: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>{moment(new Date()).format("dddd")}</Text>
                                    <Text style={[styles.txtGlobal, { fontSize: 12 }]}>{moment(new Date()).format("DD MMM YYYY")}</Text>
                                </View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("DetailAbsen")
                                }}>
                                    <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Absen Sekarang</Text>
                                </TouchableOpacity>
                            </View>
                        </View> */}
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
    containerJadwal: {
        flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, padding: 14, alignItems: 'center'
    },
    txtBoldGlobal: {
        fontFamily: fonts.interBold,
        fontSize: 15,
        color: color.black
    },
}
