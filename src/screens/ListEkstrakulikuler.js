import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from "../utils/http"
import RoleResponse from '../utils/RoleResponse'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import NoData from '../components/NoData'
import { useSelector } from 'react-redux'
import DatePicker from '../components/DatePicker'
import Button from '../components/Button'
import Combobox from '../components/Combobox'
import { ActivityIndicator } from 'react-native-paper'

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

const day = [
    {
        id: 'Senin',
        label: "Senin"
    },
    {
        id: 'Selasa',
        label: "Selasa"
    },
    {
        id: 'Rabu',
        label: "Rabu"
    },
    {
        id: 'Kamis',
        label: "Kamis"
    },
    {
        id: 'Jumat',
        label: "Jumat"
    },
    {
        id: 'Sabtu',
        label: "Sabtu"
    },
    {
        id: 'Minggu',
        label: "Minggu"
    },
]

export default function ListEkstrakulikuler(props) {
    const navigation = useNavigation()

    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listEkstra, setListEkstra] = useState([])
    const [selected, setSelected] = useState("Semua")
    const [judul, setJudul] = useState("")
    const [tanggalPinjaman, setTanggalPinjaman] = useState(new Date())
    const [jamAwal, setJamAwal] = useState(moment(new Date()).format("HH:mm"))
    const [jamAkhir, setJamAkhir] = useState(moment(new Date()).format("HH:mm"))
    const [selectedJam, setSelectedJam] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const [selectedHari, setSelectedHari] = useState(null)

    useEffect(() => {
        if (isFocused) {
            if (selected == "Semua") {
                loadData()
            }
            if (selected == "Eskul") {
                ekstrakulikulerByGuru()
            }
        }
    }, [isFocused, selected])

    const loadData = useCallback(() => {
        setIsloading(true)
        HttpRequest.ekstrakulikuler().then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListEkstra(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            setIsloading(false)
            console.log("ini eksul", res.data)
        }).catch((err) => {
            setIsloading(false)
            Toast.showError("Server err")
            console.log("err", err, err.response)
        })
    }, [listEkstra])

    const ekstrakulikulerByGuru = useCallback(() => {
        setIsloading(true)
        HttpRequest.ekstrakulikulerById(user.data.id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListEkstra(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            console.log("ini eksul by id", res)
            setIsloading(false)
        }).catch((err) => {
            setIsloading(false)
            Toast.showError("Server err")
            console.log("err", err, err.response)
        })
    }, [listEkstra])

    const btnDeleted = useCallback((value) => {
        HttpRequest.deletedEkstrakulikulerBy(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil hapus")
                loadData()
                setSelected("Eskul")
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal hapus" + `${result.message}`)
            }
            console.log("suske", res.data)
            // setListPeminjamanFasilitas(result)
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listEkstra])

    const btnSave = useCallback(() => {
        let data = {
            // id: params.id,
            // id: params.id,
            guru_id: user.data.id,
            nama: judul,
            jam_mulai: jamAwal,
            jadwal_hari: selectedHari,
            pelaksana: user.data.nama_lengkap,
        }
        console.log("da", data)
        HttpRequest.postEkstrakulikuler(data).then((res) => {
            console.log("res", res.data)
            loadData()
            setSelected("Semua")
            Toast.showSuccess("Berhasil tambah kegiatan ekstrakulikuler")
            // setTimeout(() => {
            //     navigation.goBack()
            // }, 300);
        }).catch((err) => {
            Toast.showError("Server Error: ")
        })
    }, [judul, jamAkhir, jamAwal, tanggalPinjaman])

    const toggleSetWaktuAwal = useCallback((day) => {
        setJamAwal(day)
    }, [jamAwal])

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
                                                {
                                                    isLoading && (
                                                        <>
                                                            <View style={{ height: 20 }} />
                                                            <ActivityIndicator size="small" color={color.primary} />
                                                            <Text style={[styles.txtGlobalBold, { color: color.primary, alignSelf: 'center' }]}>loading data</Text>
                                                        </>
                                                    )
                                                }
                                                {
                                                    !isLoading && (
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
                                        selected == "Eskul" && (
                                            <>
                                                {
                                                    isLoading && (
                                                        <>
                                                            <View style={{ height: 20 }} />
                                                            <ActivityIndicator size="small" color={color.primary} />
                                                            <Text style={[styles.txtGlobalBold, { color: color.primary, alignSelf: 'center' }]}>loading data</Text>
                                                        </>
                                                    )
                                                }
                                                {
                                                    !isLoading && (
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
                                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                            navigation.navigate("EditEksul", { params: item })
                                                                                        }}>
                                                                                            <Text style={[styles.txtGlobal, { color: color.primary, }]}>Edit</Text>
                                                                                        </TouchableOpacity>
                                                                                        <View style={{ flex: 1 }} />
                                                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                            btnDeleted(item.id)
                                                                                        }}>
                                                                                            <Text style={[styles.txtGlobal, { color: color.danger }]}>Hapus</Text>
                                                                                        </TouchableOpacity>
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
                                        selected == "Tambah" && (
                                            <>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Judul</Text>
                                                <TextInputIcon
                                                    value={judul}
                                                    onChangeText={setJudul}
                                                />

                                                <View style={{ height: 20 }} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Jam Mulai</Text>
                                                        <DatePicker
                                                            style={{ backgroundColor: color.white }}
                                                            mode="time"
                                                            format='HH:ss'
                                                            displayFormat='HH:ss'
                                                            nameLabel="jam mulai"
                                                            value={jamAwal}
                                                            onChange={(tanggal) => {
                                                                toggleSetWaktuAwal(tanggal)
                                                            }}
                                                        />
                                                    </View>
                                                    <View style={{ width: 20 }} />
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Pilih Hari</Text>
                                                        <Combobox
                                                            value={selectedHari}
                                                            placeholder="Silahkan Pilih"
                                                            theme={{
                                                                boxStyle: {
                                                                    backgroundColor: color.white,
                                                                    borderColor: color.Neutral20,
                                                                },
                                                                leftIconStyle: {
                                                                    color: color.Neutral10,
                                                                    marginRight: 14
                                                                },
                                                                rightIconStyle: {
                                                                    color: color.Neutral10,
                                                                },
                                                            }}
                                                            jenisIconsRight="Ionicons"
                                                            iconNameRight="caret-down-outline"
                                                            showLeftIcons={false}
                                                            data={day}
                                                            onChange={(val) => {
                                                                setSelectedHari(val);
                                                            }}
                                                        />
                                                    </View>
                                                </View>
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
                {
                    selected == "Tambah" && (
                        <>
                            <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                                <Button
                                    loading={isLoading} activeOpacity={1} onPress={() => {
                                        btnSave()
                                    }}>
                                    Simpan
                                </Button>
                            </View>
                        </>
                    )
                }
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

