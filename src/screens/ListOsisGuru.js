import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
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
        name: "Kegiatan",
    },
    {
        name: 'Tambah',
    },
    {
        name: 'Anggota'
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

export default function ListOsisGuru(props) {
    const navigation = useNavigation()

    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listEkstra, setListEkstra] = useState([])
    const [selected, setSelected] = useState("Kegiatan")

    const [judul, setJudul] = useState("")
    const [tanggalPinjaman, setTanggalPinjaman] = useState(new Date())
    const [jamAwal, setJamAwal] = useState(moment(new Date()).format("HH:mm"))
    const [jamAkhir, setJamAkhir] = useState(moment(new Date()).format("HH:mm"))
    const [isLoading, setIsloading] = useState(false)
    const [listPermintaan, setListPermintaan] = useState([])

    // useEffect(() => {
    //     if (isFocused) {
    //         if (selected == "Kegiatan") {
    //             loadData()
    //         }
    //         // if (selected == "Tambah") {
    //         //     ekstrakulikulerByGuru()
    //         // }
    //         if (selected == "Anggota") {
    //             ekstrakulikulerByGuru()
    //         }
    //     }
    // }, [isFocused, selected])

    useEffect(() => {
        if (isFocused) {
            loadKegiatan()
            loadPermintaan()
        }
    }, [isFocused])

    const loadKegiatan = useCallback(async () => {
        try {
            let data = await HttpRequest.listKegiatanOsis()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListEkstra(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${data.data.message}`)
                setListEkstra([])
            }
            console.log("res kegiatan", result)
        } catch (error) {
            setListEkstra([])
            Alert.alert("Informasi", "Server err dari api")
            console.log("ini adalah list beita", error)
        }
    }, [listEkstra])

    const loadPermintaan = useCallback(() => {
        HttpRequest.listPermintaanOsis().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListPermintaan(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", + `${result.message}`)
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server permintaan err dari api")
        })
    }, [listPermintaan])

    const btnDeleted = useCallback((value) => {
        HttpRequest.deletedOsis(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Alert.alert("Informasi", "Berhasil hapus")
                loadKegiatan()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "gagal hapus" + `${result.message}`)
            }
            console.log("suske", res.data)
            // setListPeminjamanFasilitas(result)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listEkstra])

    const btnSave = useCallback(() => {
        let data = {
            // id: params.id,
            kegiatan: judul,
            jam_mulai: jamAwal,
            jam_selesai: jamAkhir,
            pelaksana: user.data.nama_lengkap,
            tanggal: moment(tanggalPinjaman).format("YYYY-MM-DD")
        }
        // console.log("da", data)
        HttpRequest.inssertOsis(data).then((res) => {
            console.log("res", res.data)
            Alert.alert("Informasi", "Berhasil")
            setSelected("Kegiatan")
            loadKegiatan()
            // setTimeout(() => {
            //     navigation.goBack()
            // }, 300);
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
        })
    }, [judul, jamAkhir, jamAwal, tanggalPinjaman])

    const toggleSetDay = useCallback((day) => {
        setTanggalPinjaman(day)
    }, [tanggalPinjaman])

    const toggleSetWaktuAwal = useCallback((day) => {
        setJamAwal(day)
    }, [jamAwal])

    const toggleSetWaktuAkhir = useCallback((day) => {
        setJamAkhir(day)
    }, [jamAkhir])

    const btnSetujui = useCallback((value) => {
        HttpRequest.accPermintaanOsis(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Alert.alert("Informasi", "Berhasil acc permintaan osis")
                loadPermintaan()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "gagal hapus" + `${result.message}`)
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Osis</Text>
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
                                        selected == "Kegiatan" && (
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
                                                                                    <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.kegiatan}</Text>
                                                                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                                                        <Text style={[styles.txtGlobal, { flex: 1 }]}>{item.tanggal}</Text>
                                                                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                                                                            <Ionicons name="time-outline" size={20} color={color.black} />
                                                                                            <Text style={[styles.txtGlobal]}>{item.jam_mulai}</Text>
                                                                                            <Text style={[styles.txtGlobal]}> - </Text>
                                                                                            <Text style={[styles.txtGlobal]}>{item.jam_selesai}</Text>
                                                                                        </View>
                                                                                    </View>
                                                                                    <View style={{ flexDirection: 'row' }}>
                                                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                            navigation.navigate("EditKegiatanOsis", { params: item })
                                                                                        }} style={{ marginTop: 12 }}>
                                                                                            <Text style={[styles.txtGlobalBold, { color: color.primary, textAlign: 'right' }]}>Edit</Text>
                                                                                        </TouchableOpacity>
                                                                                        <View style={{ flex: 1 }} />
                                                                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                            btnDeleted(item.id)
                                                                                        }} style={{ marginTop: 12 }}>
                                                                                            <Text style={[styles.txtGlobalBold, { color: color.danger, textAlign: 'right' }]}>Hapus</Text>
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
                                        selected == "Anggota" && (
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
                                                                listPermintaan.length == 0 && (
                                                                    <>
                                                                        <NoData>Tidak ada data ekstrakulikuler</NoData>
                                                                    </>
                                                                )
                                                            }
                                                            {
                                                                listPermintaan.length > 0 && (
                                                                    listPermintaan.map((item, iList) => {
                                                                        return (
                                                                            <>
                                                                                <View style={{ flexDirection: 'row', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12, alignItems: 'center' }}>
                                                                                    <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama_lengkap}</Text>
                                                                                    <Text style={[styles.txtGlobalBold, { marginHorizontal: 10 }]}>{item.kelas}</Text>
                                                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                                        btnSetujui(item.id)
                                                                                    }}>
                                                                                        <Text style={[styles.txtGlobalBold, { flex: 1, textAlign: 'right', color: color.primary }]}>Setujui</Text>
                                                                                    </TouchableOpacity>
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
                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Tanggal</Text>
                                                <DatePicker
                                                    style={{ backgroundColor: color.white }}
                                                    format='YYYY-MM-DD'
                                                    displayFormat='DD MMM YYYY'
                                                    nameLabel="tanggal"
                                                    value={tanggalPinjaman}
                                                    onChange={(tanggal) => {
                                                        toggleSetDay(tanggal)
                                                    }}
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
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Jam Akhir</Text>
                                                        <DatePicker
                                                            style={{ backgroundColor: color.white }}
                                                            mode="time"
                                                            format='HH:ss'
                                                            displayFormat='HH:ss'
                                                            nameLabel="jam akhir"
                                                            value={jamAkhir}
                                                            onChange={(tanggal) => {
                                                                toggleSetWaktuAkhir(tanggal)
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

