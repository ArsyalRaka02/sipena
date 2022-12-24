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
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListAbsen(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [listJadwal, setListJadwal] = useState([])
    const [senin, setSenin] = useState([])
    const [selasa, setSelasa] = useState([])
    const [rabu, setRabu] = useState([])
    const [kamis, setKamis] = useState([])
    const [jumat, setJumat] = useState([])
    const [sabtu, setSabtu] = useState([])

    useEffect(() => {
        loadListJadwal()
    }, [user])

    const loadListJadwal = useCallback(() => {
        let id = user.data.kelas_id
        if (id == "") {
            return Toast.showError("tidak mendapatkan id kelas")
        }
        HttpRequest.jadwalBaruPerhariByKelas(id).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListJadwal(res.data.data)
                // setSenin(res.data.data.Senin)
                // setSelasa(res.data.data.Selasa)
                // setRabu(res.data.data.Rabu)
                // setKamis(res.data.data.Kamis)
                // setJumat(res.data.data.Jumat)
                // setSabtu(res.data.data.Sabtu)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
                setListJadwal([])
            }
            console.log("ini adalah jadwal matapelajaran", res.data.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listJadwal, senin, selasa, rabu, kamis, jumat, sabtu])

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
                        {/* <View style={{ marginVertical: 12 }}>
                            <Text style={[styles.txtBoldGlobal]}>Senin</Text>
                        </View> */}
                        {/* {
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
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                </>
                            )
                        } */}
                        <View style={{ marginVertical: 12 }}>
                            <Text style={[styles.txtBoldGlobal]}>{moment(new Date()).format("dddd")}</Text>
                        </View>
                        {
                            listJadwal.length == 0 && (
                                <>
                                    <NoData>Tidak ada jadwal</NoData>
                                </>
                            )
                        }
                        {
                            listJadwal.length > 0 && (
                                <>
                                    {
                                        listJadwal.map((item, iJadwal) => {
                                            return (
                                                <>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                                                        <Text style={[styles.txtBoldGlobal]}>{item.mapel_nama}</Text>
                                                        <View style={{ flex: 1 }} />
                                                        <View style={{ flexDirection: 'column' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 10, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal, { marginBottom: 12 }]}>{item.jadwal_waktu_mulai} - {item.jadwal_waktu_akhir}</Text>
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
                                </>
                            )
                        }
                        {/* {
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
                        } */}
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
