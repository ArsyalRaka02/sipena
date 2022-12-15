import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'
import { useSelector } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListJadwal(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listJadwal, setListJadwal] = useState([])
    const [detail, setDetail] = useState({})
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        if (user) {
            loadProfile()
            loadListJadwal()
        }
    }, [user])

    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let result = res.data.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal status == 2")
                setDetail([])
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [detail, user])

    const loadListJadwal = useCallback(() => {
        let id = user.data.kelas_id
        HttpRequest.listJadwalKelas(id).then((res) => {
            let result = res.data.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal mendapatkan list jadwal")
                setListJadwal([])
            }
        }).catch((err) => {
            console.log("err", err, err.response)
            setListJadwal([])
        })
    }, [listJadwal, detail])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Jadwal</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {/* {
                        listJadwal.length == 0 && (
                            <>
                                <NoData>Tidak ada Jadwal</NoData>
                            </>
                        )
                    }
                    {
                        listJadwal.length > 0 && (
                            listMapel.map((item, iListM) => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: color.primaryRGBA, alignItems: 'center', flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12 }}>
                                            <Ionicons name={"calendar-outline"} size={24} color={color.primary} />
                                            <Text style={[styles.txtGlobalBold, { color: color.primary, marginLeft: 16 }]}>{item.nama}</Text>
                                        </View>
                                    </>
                                )
                            })
                        )
                    } */}
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            {/* <ListPelajaran data={listJadwal} /> */}
                            {
                                listJadwal.length == 0 && (
                                    <NoData>Tidak ada jadwal harian</NoData>
                                )
                            }
                            {
                                listJadwal.length > 0 && (
                                    listJadwal.map((item, iList) => {
                                        return (
                                            <>
                                                <View style={{ marginVertical: 12 }}>
                                                    <Text style={[styles.txtGlobalBold]}>{item.jadwal_hari}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                                    <Text style={[styles.txtBoldGlobal]}>{item.mapel_nama}</Text>
                                                    <View style={{ flex: 1 }} />
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                                                        <Text style={[styles.txtGlobal]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                    </View>
                                                </View>
                                            </>
                                        )
                                    })

                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListPelajaran({ data }) {
    return (
        <>

            {/* <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Senin</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                </View>
            </View> */}
            {/* <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Selasa</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                </View>
            </View>
            <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Rabu</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
                </View>
            </View> */}
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
