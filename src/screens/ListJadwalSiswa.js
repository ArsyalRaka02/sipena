import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, TouchableOpacityBase } from 'react-native'
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

export default function ListJadwalSiswa(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listJadwal, setListJadwal] = useState([])
    const [detail, setDetail] = useState({})
    const [isLoading, setIsloading] = useState(true)
    const [listKelas, setListKelas] = useState([])
    const [senin, setSenin] = useState([])
    const [selasa, setSelasa] = useState([])
    const [rabu, setRabu] = useState([])
    const [kamis, setKamis] = useState([])
    const [jumat, setJumat] = useState([])
    const [sabtu, setSabtu] = useState([])
    const [selectedKelas, setSelectedKelas] = useState(null)
    const [listSekolah, setListSekolah] = useState([])

    useEffect(() => {
        if (user) {
            loadListJadwal()
            loadKelas()
        }
    }, [user])

    const loadListJadwal = useCallback(async () => {
        // let id = user.data.kelas_id
        try {
            let data = await HttpRequest.jadwalBaru()
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListMapel(data.data.data)
                setSenin(data.data.data.Senin)
                setSelasa(data.data.data.Selasa)
                setRabu(data.data.data.Rabu)
                setKamis(data.data.data.Kamis)
                setJumat(data.data.data.Jumat)
                setSabtu(data.data.data.Sabtu)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Server Error: ")
                setListMapel([])
            }
            console.log("ini list mabel", data.data.data)
        } catch (error) {
            setListMapel([])
            console.log("err", error, error.response)
            Toast.showError("Server Error: ")
        }
    }, [listMapel, detail, user, selectedKelas, senin, selasa, rabu, kamis, jumat, sabtu])

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
                Toast.showError(`${res.data.message}`)
            }
            console.log("res", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
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
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtBoldGlobal]}>Senin</Text>
                            </View>
                            {
                                senin.length == 0 && (
                                    <NoData>Tidak ada jadwal Senin</NoData>
                                )
                            }
                            {
                                senin.length > 0 && (
                                    <>
                                        {
                                            senin.map((item, iList) => {
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

                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtBoldGlobal]}>Selasa</Text>
                            </View>
                            {
                                selasa.length == 0 && (
                                    <NoData>Tidak ada jadwal Selasa</NoData>
                                )
                            }
                            {
                                selasa.length > 0 && (
                                    <>
                                        {
                                            selasa.map((item, iList) => {
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
                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtBoldGlobal]}>Rabu</Text>
                            </View>
                            {
                                rabu.length == 0 && (
                                    <NoData>Tidak ada jadwal Rabu</NoData>
                                )
                            }
                            {
                                rabu.length > 0 && (
                                    <>
                                        {
                                            rabu.map((item, iList) => {
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
                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtBoldGlobal]}>Kamis</Text>
                            </View>
                            {
                                kamis.length == 0 && (
                                    <NoData>Tidak ada jadwal Kamis</NoData>
                                )
                            }
                            {
                                kamis.length > 0 && (
                                    <>
                                        {
                                            kamis.map((item, iList) => {
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

                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtBoldGlobal]}>Jumat</Text>
                            </View>
                            {
                                jumat.length == 0 && (
                                    <NoData>Tidak ada jadwal jumat</NoData>
                                )
                            }
                            {
                                jumat.length > 0 && (
                                    <>
                                        {
                                            jumat.map((item, iList) => {
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

                            <View style={{ marginVertical: 12 }}>
                                <Text style={[styles.txtBoldGlobal]}>Sabtu</Text>
                            </View>
                            {
                                sabtu.length == 0 && (
                                    <NoData>Tidak ada jadwal Sabtu</NoData>
                                )
                            }
                            {
                                sabtu.length > 0 && (
                                    <>
                                        {
                                            sabtu.map((item, iList) => {
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
    txtBoldGlobal: {
        fontFamily: fonts.interBold,
        fontSize: 15,
        color: color.black
    },
}
