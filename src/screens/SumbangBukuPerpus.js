import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function SumbangBukuPerpus(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [listSumbangBuku, setListSumbangBuku] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isFocused) {
            loadData()
        }
    }, [isFocused])

    const loadData = useCallback(() => {
        HttpRequest.listSumbangBuku().then((res) => {
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                //ambil ketika tidak ada kondisi
                setListSumbangBuku(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Error: " + `${res.data.message}`)
                setListSumbangBuku([])
            }
            console.log("ini adalah sumbang buku", res.data)
        }).catch((err) => {
            Toast.showError("Server Err: ")
            console.log("ini adalah err", err, err.response)
        })
    }, [listSumbangBuku])

    const btnDelete = useCallback((value) => {
        HttpRequest.deleteSumbangBuku(value).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil hapus sumbang buku")
                loadData()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal hapus" + `${res.data.message}`)
            }
        }).catch((err) => {
            Toast.showError("Server Error: ")
            console.log("gagal delete fasilitas ", err, err.response)
        })
    }, [listSumbangBuku])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Sumbang Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listSumbangBuku.length == 0 && (
                                <>
                                    <NoData>Tidak ada Kembalikan buku</NoData>
                                </>
                            )
                        }
                        {
                            listSumbangBuku.map((item, iPerpus) => {
                                return (
                                    <>
                                        <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.txtGlobalBold, { color: color.black, flex: 1 }]}>{item.user_nama}</Text>
                                            </View>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                        <Text>Penulis: </Text>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.author}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text>Jumlah Halaman: </Text>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.total_halaman}</Text>
                                                    </View>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        navigation.navigate("DetailSumbangBuku", { params: item })
                                                    }} style={{ marginVertical: 12 }}>
                                                        <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Lihat Detail</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                                        <Text>Kategori: </Text>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.kategori_nama}</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <Text style={[styles.txtGlobal, { color: color.black50F }]}>bahasa: </Text>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.bahasa}</Text>
                                                    </View>

                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        btnDelete(item.id)
                                                    }} style={{ marginVertical: 12 }}>
                                                        <Text style={[styles.txtGlobalBold, { color: color.danger }]}>Delete</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }

                        {/* <View style={{ flexDirection: 'column', backgroundColor: color.white, padding: 12, borderRadius: 12, flex: 1, overflow: 'hidden' }}>
                            <Text style={[styles.txtGlobalBold, { fontSize: 16, marginBottom: 10 }]}>judul</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flexDirection: 'column', flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <Text>Penulis: </Text>
                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>author</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text>Jumlah Halaman: </Text>
                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>total halaman</Text>
                                    </View>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        navigation.navigate("DetailSumbangBuku", { params: item })
                                    }} style={{ marginVertical: 12 }}>
                                        <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Lihat Detail</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                        <Text>Kategori: </Text>
                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>kategori</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={[styles.txtGlobal, { color: color.black50F }]}>bahasa: </Text>
                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>indonesia</Text>
                                    </View>

                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        btnDelete(item.id)
                                    }} style={{ marginVertical: 12 }}>
                                        <Text style={[styles.txtGlobalBold, { color: color.danger }]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
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
}