import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'
import { useSelector } from 'react-redux'
import Combobox from '../components/Combobox'
import RoleResponse from '../utils/RoleResponse'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const tab = [
    {
        name: "Sekolah"
    },
    {
        name: "Kelas"
    }
]

export default function ListJadwalMenuSiswa(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [listMapel, setListMapel] = useState([])
    const [selected, setSelected] = useState("Sekolah")
    const [listSekolah, setListSekolah] = useState([])
    const [detail, setDetail] = useState({})
    const [listKelas, setListKelas] = useState([])
    const [selectedKelas, setSelectedKelas] = useState(null)

    useEffect(() => {
        loadProfile()
        loadJadwalSekolah()
        loadMapel()
        loadKelas()
    }, [user, selectedKelas])

    const loadProfile = useCallback(() => {
        let id = user.id
        HttpRequest.getProfile(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setDetail(res.data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal status == 2")
                setDetail([])
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [detail])

    const loadJadwalSekolah = useCallback(() => {
        HttpRequest.listJadwalSekolah().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListSekolah(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Error: " + `${result.message}`)
            }
            console.log("sekolah", res.data.data)
        }).catch((err) => {
            Toast.showError("Server error: ")
            console.log("err", err, err.response)
        })
    }, [listSekolah])

    const loadMapel = useCallback(async () => {
        let id = user.data.kelas_id
        try {
            let data = await HttpRequest.listJadwalKelas(id)
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListMapel(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Server Error: ")
                setListMapel([])
            }
            console.log("ini list mabel", data)
        } catch (error) {
            setListMapel([])
            console.log("err", error, error.response)
            Toast.showError("Server Error: ")
        }
    }, [listMapel, detail, user, selectedKelas])

    const loadKelas = useCallback(async () => {
        try {
            let data = await HttpRequest.listMapel()
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let result = data.data.data.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setListKelas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Server Error: ")
                setListKelas([])
            }
            console.log("ini list kelas", data)
        } catch (error) {
            setListKelas([])
            console.log("err", error, error.response)
            Toast.showError("Server Error: ")
        }
    }, [listKelas])

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
                    <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                        {
                            tab.map((item) => {
                                return (
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        setSelected(item.name)
                                        // if (item.name == "kelas") {
                                        //     loadMapel()
                                        // }
                                    }} style={{ padding: 12, borderRadius: 8, backgroundColor: color.white, alignItems: 'center', flex: 1, marginHorizontal: 10 }}>
                                        <Text style={[styles.txtGlobalBold, { color: selected == item.name ? color.primary : color.black }]}>{item.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    <View style={{ height: 12 }} />
                    <ScrollView>
                        <View style={{ flex: 1 }}>
                            {
                                selected === "Sekolah" && (
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
                                selected === "Kelas" && (
                                    <>
                                        {
                                            listMapel.length == 0 && (
                                                <NoData>Tidak ada jadwal harian</NoData>
                                            )
                                        }
                                        {
                                            listMapel.length > 0 && (
                                                <>
                                                    <View style={{ marginVertical: 12 }}>
                                                        <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                                                    </View>
                                                    {
                                                        listMapel.map((item, iList) => {
                                                            return (
                                                                <>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                                                        <Text style={[styles.txtBoldGlobal]}>{item.mapel_nama}</Text>
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
                        </View>
                    </ScrollView>
                    {/* </View> */}
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
