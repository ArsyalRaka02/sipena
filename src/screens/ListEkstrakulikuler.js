import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from "../utils/http"
import RoleResponse from '../utils/RoleResponse'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import NoData from '../components/NoData'
import { useSelector } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const tab = [
    {
        name: "Semua",
    },
    {
        name: 'Eskul',
    },
    {
        name: 'Tambah'
    }
]

export default function ListEkstrakulikuler(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [listEkstra, setListEkstra] = useState([])
    const [selected, setSelected] = useState("Semua")

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        HttpRequest.ekstrakulikuler().then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListEkstra(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            console.log("ini eksul", res.data)
        }).catch((err) => {
            Toast.showError("Server err")
            console.log("err", err, err.response)
        })
    }, [listEkstra])

    console.log("selected", selected)

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kegiatan Ekstrakulikuler</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        {
                            user.data.is_ekstrakulikuler == "Y" && (
                                <>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {
                                            tab.map((item, index) => {
                                                return (
                                                    <>
                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                            setSelected(item.name)
                                                        }} style={{ backgroundColor: color.white, padding: 12, alignContent: 'center', alignItems: 'center', borderRadius: 12, flex: 1, marginHorizontal: 4 }}>
                                                            <Text style={[{ color: selected === item.name ? color.primary : color.black }]}>{item.name}</Text>
                                                        </TouchableOpacity>
                                                        {/* <View style={{ width: 10 }} /> */}
                                                    </>
                                                )
                                            })
                                        }
                                    </View>
                                    {
                                        selected == "Semua" && (
                                            <>
                                                <View style={{ height: 20 }} />
                                                {
                                                    listEkstra.length == 0 && (
                                                        <>
                                                            <NoData>Tidak ada data ekstrakulikuler</NoData>
                                                        </>
                                                    )
                                                }
                                                {
                                                    listEkstra.length > 0 && (
                                                        listEkstra.map((item, iList) => {
                                                            return (
                                                                <>
                                                                    <View style={{ flexDirection: 'column', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
                                                                        <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama}</Text>
                                                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                                            <Text style={[styles.txtGlobal, { flex: 1 }]}>{item.jadwal_hari}</Text>
                                                                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                                                <Ionicons name="time-outline" size={20} color={color.black} />
                                                                                <Text style={[styles.txtGlobal, { marginLeft: 10 }]}>{item.jam_mulai}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ height: 20 }} />
                                                                </>
                                                            )
                                                        })
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                        {
                            user.data.is_ekstrakulikuler != "Y" && (
                                <>
                                    {
                                        listEkstra.length == 0 && (
                                            <>
                                                <NoData>Tidak ada data ekstrakulikuler</NoData>
                                            </>
                                        )
                                    }
                                    {
                                        listEkstra.length > 0 && (
                                            listEkstra.map((item, iList) => {
                                                return (
                                                    <>
                                                        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
                                                            <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama}</Text>
                                                            <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                                <Text style={[styles.txtGlobal, { flex: 1 }]}>{item.jadwal_hari}</Text>
                                                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                                    <Ionicons name="time-outline" size={20} color={color.black} />
                                                                    <Text style={[styles.txtGlobal, { marginLeft: 10 }]}>{item.jam_mulai}</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        <View style={{ height: 20 }} />
                                                    </>
                                                )
                                            })
                                        )
                                    }
                                </>
                            )
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

// function ListCard() {
//     let data = [
//         {
//             nama: "Basket",
//             jadwal_awal: "07.00",
//             jadwal_akhir: "22.00",
//             tanggal: "2022-11-22"
//         },
//         {
//             nama: "Sepak Bola",
//             jadwal_awal: "07.00",
//             jadwal_akhir: "22.00",
//             tanggal: "2022-08-22"
//         },
//         {
//             nama: "Futsal",
//             jadwal_awal: "07.00",
//             jadwal_akhir: "22.00",
//             tanggal: "2022-11-22"
//         },
//     ]
//     return (
//         <>
//             {
//                 data.map((item, iList) => {
//                     return (
//                         <>
//                             <View style={{ flexDirection: 'column', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
//                                 <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama}</Text>
//                                 <View style={{ flexDirection: "row", alignItems: 'center' }}>
//                                     <Text style={[styles.txtGlobal, { flex: 1 }]}>{item.tanggal}</Text>
//                                     <View style={{ flexDirection: "row", alignItems: 'center' }}>
//                                         <Ionicons name="time-outline" size={20} color={color.black} />
//                                         <Text style={[styles.txtGlobal]}>{item.jadwal_awal}</Text>
//                                         <Text style={[styles.txtGlobal]}> - </Text>
//                                         <Text style={[styles.txtGlobal]}>{item.jadwal_akhir}</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{ height: 20 }} />
//                         </>
//                     )
//                 })
//             }
//         </>
//     )
// }

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

