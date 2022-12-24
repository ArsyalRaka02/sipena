import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
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
import NoData from '../components/NoData'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import DatePicker from '../components/DatePicker'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function KegiatanOsis(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const user = useSelector(state => state.user);
    const [listKegiatan, setListKegiatan] = useState([])
    const [selected, setSelected] = useState("Kegiatan")
    const [judul, setJudul] = useState("")
    const [tanggalPinjaman, setTanggalPinjaman] = useState(new Date())
    const [jamAwal, setJamAwal] = useState(moment(new Date()).format("HH:mm"))
    const [jamAkhir, setJamAkhir] = useState(moment(new Date()).format("HH:mm"))
    const [isLoading, setIsloading] = useState(false)

    useEffect(() => {
        if (isFocused) {
            loadKegiatan()
        }
    }, [isFocused])

    const loadKegiatan = useCallback(async () => {
        try {
            let data = await HttpRequest.listKegiatanOsis()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListKegiatan(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${data.data.message}`)
                setListKegiatan([])
            }
            console.log("res kegiatan", result)
        } catch (error) {
            setListKegiatan([])
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listKegiatan])

    const btnDeleted = useCallback((value) => {
        HttpRequest.deletedOsis(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil hapus")
                loadKegiatan()
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
    }, [listKegiatan])

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
            Toast.showSuccess("Berhasil Tambah")
            setSelected("Kegiatan")
            loadKegiatan()
            // setTimeout(() => {
            //     navigation.goBack()
            // }, 300);
        }).catch((err) => {
            Toast.showError("Server Error: ")
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

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kegiatan Osis</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {/* <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconName={"search-outline"}
                        placeholder="Nama Kegiatan"
                    /> */}
                    <View style={{ flexDirection: 'row' }}>
                        {
                            user.data.is_osis == "Y" && (
                                <>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        setSelected("Kegiatan")
                                    }} style={{ flex: 1, backgroundColor: color.white, alignItems: "center", paddingVertical: 12, borderRadius: 12 }}>
                                        <Text style={[styles.txtGlobalBold, { color: selected == "Kegiatan" ? color.primary : color.black }]}>Kegiatan</Text>
                                    </TouchableOpacity>
                                    <View style={{ width: 30 }} />
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        setSelected("Tambah")
                                    }} style={{ flex: 1, backgroundColor: color.white, alignItems: "center", paddingVertical: 12, borderRadius: 12 }}>
                                        <Text style={[styles.txtGlobalBold, { color: selected == "Tambah" ? color.primary : color.black }]}>Tambah Kegiatan</Text>
                                    </TouchableOpacity>
                                </>
                            )
                        }
                    </View>
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        {
                            user.data.is_osis == "Y" && (
                                <>
                                    {
                                        selected == "Kegiatan" && (
                                            <>
                                                {
                                                    listKegiatan.length == 0 && (
                                                        <NoData>Tidak ada kegiatan</NoData>
                                                    )
                                                }
                                                {
                                                    listKegiatan.length > 0 && (
                                                        listKegiatan.map((item, i) => {
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
                                    {
                                        selected == "Tambah" && (
                                            <>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Judul</Text>
                                                <TextInputIcon
                                                    value={judul}
                                                    onChangeText={setJudul}
                                                />
                                                <View style={{ height: 20 }} />
                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Tanggal Pinjaman</Text>
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
                        {
                            user.data.is_osis != "Y" && (
                                <ListCard data={listKegiatan} />
                            )
                        }
                    </ScrollView>
                </View>
                {/* {
                    user.data.is_role == "Y" && (
                        <> */}
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
                {/* </>
                    )
                } */}

            </SafeAreaView>
        </>
    )
}

function ListCard({ data }) {
    return (
        <>
            {
                data.length == 0 && (
                    <>
                        <NoData>Tidak ada data</NoData>
                    </>
                )
            }
            {
                data.length > 0 && (
                    data.map((item, iList) => {
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

