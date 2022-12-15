import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Combobox from '../components/Combobox'
import DatePicker from '../components/DatePicker'
import Button from '../components/Button'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import { useSelector } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const listFasilitas = [
    {
        id: "ruang komputer",
        label: "ruang komputer"
    }
]

export default function ListPinjamFasilitas(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [selectedFasilitas, setSelectedFasilitas] = useState(null)
    const [tanggalPinjaman, setTanggalPinjaman] = useState(new Date())
    const [jamAwal, setJamAwal] = useState(moment(new Date()).format("HH:mm"))
    const [jamAkhir, setJamAkhir] = useState(moment(new Date()).format("HH:mm"))
    const [fasilitas, setFasilitas] = useState([])

    const toggleSetDay = useCallback((day) => {
        setTanggalPinjaman(day)
    }, [tanggalPinjaman])

    const toggleSetWaktuAwal = useCallback((day) => {
        setJamAwal(day)
    }, [jamAwal])

    const toggleSetWaktuAkhir = useCallback((day) => {
        setJamAkhir(day)
    }, [jamAkhir])

    useEffect(() => {
        loadData()
    }, [user])

    const loadData = useCallback(async () => {
        try {
            let data = await HttpRequest.listFasilitas()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let loop = result.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setFasilitas(loop)
                console.log("res", result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Gagal status == 2")
                setFasilitas([])
            }
            console.log("ini adalah list fasilitas", result)
        } catch (error) {
            Toast.showError("Server Error: ")
            setFasilitas([])
            console.log("err", error, error.response)
        }
    }, [fasilitas])

    const btnPinjam = useCallback(() => {
        if (selectedFasilitas == null) {
            return Toast.showError("Mohon Pilih Fasilitas")
        }
        let data = {
            peminjaman_fasilitas_id: selectedFasilitas,
            user_id: user.id,
            jam_mulai: String(jamAwal),
            jam_selesai: String(jamAkhir),
            tanggal: moment(tanggalPinjaman).format("YYYY-MM-DD")
        }
        // console.log("data", data)
        HttpRequest.postAjukanPinjaman(data).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil meminjam")
                setTimeout(() => {
                    navigation.goBack()
                }, 300);
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("error" + `${res.data.message}`)
            }
            console.log("berhasil ajukan", res)
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("err", err, err.response)
        })
    }, [user, selectedFasilitas, jamAkhir, jamAwal, tanggalPinjaman])

    const getFormData = (object) => {
        const formData = new FormData();
        Object.keys(object).forEach(key => formData.append(key, object[key]));
        return formData;
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Peminjaman Fasilitas</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/images/warning.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Gunakan Fasilitas Sekolah</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Tunggu persetujuan admin ketika sudah konfirmasi</Text>
                        </View>
                    </View>

                    <ScrollView>
                        <View style={{ marginVertical: 10 }}>
                            <View style={{ height: 20 }} />
                            <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginBottom: 10 }]}>Fasilitas</Text>

                            <Combobox
                                value={selectedFasilitas}
                                placeholder="Silahkan Pilih Fasilitas"
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
                                data={fasilitas}
                                onChange={(val) => {
                                    setSelectedFasilitas(val);
                                }}
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
                        </View>
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} onPress={() => {
                        btnPinjam()
                    }}>
                        Ajukan Peminjaman
                    </Button>
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

