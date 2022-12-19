import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import { useSelector } from 'react-redux'
import Toast from '../components/Toast'
import NoData from '../components/NoData'
import Rupiah from '../utils/Rupiah'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function PerpustakaanKembaliBuku(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [listBuku, setListBuku] = useState([])
    const [denda, setDenda] = useState(0)
    const [waktu, setWaktu] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user) {
            loadBuku()
        }
    }, [user])

    const loadBuku = useCallback(async () => {
        try {
            let data = await HttpRequest.kembalikanBukuById(user.id)
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                data.data.data.map((item) => {
                    let a = moment(new Date())
                    let b = moment(item.tanggal_pengembalian)
                    let def = a.diff(b, 'days')
                    if (a > b) {
                        setDenda(def * 1000)
                    } else {
                        setDenda(0)
                    }
                })
                setListBuku(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal status = 2")
                setListBuku([])
            }
            console.log("res load", data.data)
        } catch (error) {
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listBuku, user, denda])

    const btnSave = useCallback(() => {
        let data = {
            user_id: user.id,
            total_denda: denda,
        }
        setIsLoading(true)
        HttpRequest.insertKembalikanBuku(data).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setTimeout(() => {
                    Toast.showSuccess("berhasil kembalikan buku")
                    navigation.goBack()
                }, 300);
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            console.log("res sukses", res.data)
        }).catch((err) => {
            Toast.showError("Server Err:")
            console.log("err", err, err.response)
        })
    }, [denda])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kembalikan Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/images/warning.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Durasi Peminjaman Buku 1 Minggu</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Jika lebih dari itu denda seribu perhari</Text>
                        </View>
                    </View>

                    {/* //list buku */}
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <Text style={[styles.txtGlobalBold, { fontSize: 18, color: color.black, marginVertical: 20 }]}>Daftar Buku</Text>
                            {
                                listBuku.map((item, iList) => {
                                    return (
                                        <>
                                            {
                                                item.buku_pinjam.length == 0 && (
                                                    <NoData>Tidak ada list buku</NoData>
                                                )
                                            }
                                            {
                                                item.buku_pinjam.map((itemBuku, ibuku) => {
                                                    return (
                                                        <>
                                                            {
                                                                itemBuku.map((lol, iLol) => {
                                                                    let warna = color.black
                                                                    let tanggalA = moment(new Date()).locale("id").format("YYYY-MM-DD")
                                                                    let tanggalB = moment(item.tanggal_pengembalian).format("YYYY-MM-DD")
                                                                    if (tanggalA > tanggalB) {
                                                                        warna = color.danger
                                                                    }
                                                                    return (
                                                                        <>
                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, marginBottom: 10 }}>
                                                                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{lol.judul}</Text>
                                                                                    <Text style={[styles.txtGlobal, { fontSize: 13, color: color.black }]}>{lol.author}</Text>
                                                                                </View>
                                                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: warna, fontStyle: "italic", fontWeight: "900" }]}>{moment(item.tanggal_pengembalian).utc("7").fromNow()}</Text>
                                                                            </View>
                                                                        </>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                })
                            }
                            <Text style={[styles.txtGlobalBold, { fontSize: 18, marginVertical: 20, color: color.black }]}>Total Denda</Text>
                            <View style={{ backgroundColor: color.themeGray, borderColor: color.themeGray, padding: 16, borderRadius: 12 }}>
                                <Text style={[styles.txtGlobal, { color: color.black }]}>{Rupiah.format(denda)}</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button
                        onPress={() => {
                            btnSave()
                        }}
                    >
                        Kembalikan Buku
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
