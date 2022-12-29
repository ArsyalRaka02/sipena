import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacityBase, Alert } from 'react-native'
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
import RoleResponse from '../utils/RoleResponse'
import Combobox from '../components/Combobox'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListJadwal(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listJadwal, setListJadwal] = useState([])
    const [detail, setDetail] = useState({})
    const [isLoading, setIsloading] = useState(true)
    const [listKelas, setListKelas] = useState([])
    const [selectedKelas, setSelectedKelas] = useState(null)
    const [listSekolah, setListSekolah] = useState([])

    useEffect(() => {
        if (user) {
            // loadProfile()
            loadListJadwal()
            // loadKelas()
            // if (user.role_id == RoleResponse.guru) {
            //     loadJadwalSekolah()
            // }
        }
    }, [user])

    // const loadProfile = useCallback(() => {
    //     let id = user.id
    //     HttpRequest.getProfile(id).then((res) => {
    //         let result = res.data.data.data
    //         let status = res.data.status
    //         if (status == responseStatus.INSERT_SUKSES) {
    //             setDetail(result)
    //         }
    //         if (status == responseStatus.INSERT_GAGAL) {
    //             Alert.alert("Informasi", `${res.data.message}`)
    //             setDetail([])
    //         }
    //     }).catch((err) => {
    //         Alert.alert("Informasi", "Server err dari api")
    //         console.log("err", err, err.response)
    //     })
    // }, [detail, user])

    const loadListJadwal = useCallback(() => {
        let id = user.siswa.kelas_id
        HttpRequest.jadwalBaruPerhariByKelas(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
            console.log("list", res.data)
        }).catch((err) => {
            console.log("err jadwal", err, err.response)
            setListJadwal([])
        })
    }, [listJadwal])

    const loadKelas = useCallback(() => {
        HttpRequest.listMapel().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let result = res.data.data.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setListKelas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)
            }
            console.log("res", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listKelas])

    const loadJadwalSekolah = useCallback(() => {
        HttpRequest.listJadwalSekolah().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListSekolah(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error: " + `${result.message}`)
            }
            console.log("sekolah", res.data.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    }, [listSekolah])


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
                        kelas.length == 0 && (
                            <>
                                <NoData>Tidak ada Jadwal</NoData>
                            </>
                        )
                    }
                    {
                        kelas.length > 0 && (
                            kelas.map((item, iListM) => {
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
                                user.role_id == RoleResponse.guru && (
                                    <>
                                        {
                                            listSekolah.length == 0 && (
                                                <NoData>Tidak ada jadwal harian</NoData>
                                            )
                                        }
                                        {
                                            listSekolah.length > 0 && (
                                                listSekolah.map((item, iList) => {
                                                    return (
                                                        <>
                                                            <View style={{ marginVertical: 12 }}>
                                                                <Text style={[styles.txtGlobalBold]}>{item.jadwal_hari}</Text>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                                                <Text style={[styles.txtBoldGlobal]}>{item.kegiatan}</Text>
                                                                <View style={{ flex: 1 }} />
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                                                                    <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jam_mulai} - {item.jam_selesai}</Text>
                                                                </View>
                                                            </View>
                                                        </>
                                                    )
                                                })

                                            )
                                        }
                                    </>
                                )
                            }
                            {
                                user.role_id == RoleResponse.siswa && (
                                    <>
                                        {
                                            listJadwal.length == 0 && (
                                                <NoData>Tidak ada jadwal harian</NoData>
                                            )
                                        }
                                        {
                                            listJadwal.length > 0 && (
                                                <>
                                                    <View style={{ marginVertical: 12 }}>
                                                        <Text style={[styles.txtGlobalBold]}>{moment(new Date()).format("dddd")}</Text>
                                                    </View>
                                                    {
                                                        listJadwal.map((item, iList) => {
                                                            return (
                                                                <>
                                                                    {/* <View style={{ marginVertical: 12 }}>
                                                                        <Text style={[styles.txtGlobalBold]}>{item.jadwal_hari}</Text>
                                                                    </View> */}
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                                                        <Text style={[styles.txtGlobalBold]}>{item.mapel_nama}</Text>
                                                                        <View style={{ flex: 1 }} />
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                                                                            <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ height: 20 }} />
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </>
                                            )
                                        }
                                    </>
                                )
                            }

                            {
                                listJadwal.length == 0 && (
                                    <NoData>Tidak ada jadwal harian</NoData>
                                )
                            }
                            {
                                listJadwal.length > 0 && (
                                    <>
                                        <View style={{ marginVertical: 12 }}>
                                            <Text style={[styles.txtGlobalBold]}>{moment(new Date()).format("dddd")}</Text>
                                        </View>
                                        {
                                            listJadwal.map((item, iList) => {
                                                return (
                                                    <>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                                            <Text style={[styles.txtGlobalBold]}>{item.mapel_nama}</Text>
                                                            <View style={{ flex: 1 }} />
                                                            <View style={{ flexDirection: 'row' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                                                                <Text style={[styles.txtGlobal, { marginLeft: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ height: 20 }} />
                                                    </>
                                                )
                                            })
                                        }
                                    </>
                                )
                            }
                        </ScrollView>
                    </View>
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
