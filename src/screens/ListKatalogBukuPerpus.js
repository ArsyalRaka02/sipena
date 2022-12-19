import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, ActivityIndicator } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import app from '../config/app'
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListKatalogBukuPerpus(props) {
    const navigation = useNavigation()

    const isFocused = useIsFocused()
    const [listKategori, setListKategori] = useState([])
    const [selectedKategori, setSelectedKategori] = useState(null)
    const [listBuku, setListBuku] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (isFocused) {
            loadKatalogKategori()
            loadBuku()
        }
    }, [isFocused, selectedKategori])

    const loadBuku = useCallback(() => {
        setIsLoading(true)
        HttpRequest.katalogBuku(selectedKategori).then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBuku(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBuku([])
            }
            setIsLoading(false)
            console.log("list", res.data)
        }).catch((err) => {
            setIsLoading(false)
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", err)
        })
    }, [listBuku])

    const loadKatalogKategori = useCallback(async () => {
        try {
            let data = await HttpRequest.kategoriBuku()
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListKategori(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal status = 2")
                setListKategori([])
            }
        } catch (error) {
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listKategori])

    const btnDelete = useCallback((value) => {
        HttpRequest.deleteKatalogBuku(value).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess("Berhasil menghapus")
                loadBuku()
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                return Toast.showError(`${res.data.message}`)
            }
        }).catch((err) => {
            Toast.showError("Server Err: ")
            console.log("err delet", err, err.response)
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
                    <Text style={styles.txtHeader}>Katalog Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Button onPress={() => {
                        navigation.navigate("TambahBukuPerpus")
                    }}>
                        Tambah Buku
                    </Button>
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        <View>
                            <Text style={[styles.txtGlobalBold, { marginTop: 12, color: color.black }]}>Kategori Buku</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                                <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 20 }}>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        if (!isLoading) {
                                            setSelectedKategori(null)
                                        }

                                    }} style={[{ backgroundColor: color.white, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 }]}>
                                        <Text style={[styles.txtGlobalBold, { fontSize: 13, color: selectedKategori == null ? color.primary : color.black }]}>Semua</Text>
                                    </TouchableOpacity>
                                    <View style={{ marginLeft: 12 }} />
                                    {
                                        listKategori.map((item, iList) => {
                                            return (
                                                <>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        if (!isLoading) {
                                                            setSelectedKategori(item.id)
                                                        }
                                                    }} style={[{ backgroundColor: color.white, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 }]}>
                                                        <Text style={[styles.txtGlobalBold, { fontSize: 13, color: selectedKategori == item.id ? color.primary : color.black }]}>{item.nama}</Text>
                                                    </TouchableOpacity>
                                                    <View style={{ marginLeft: 12 }} />
                                                </>
                                            )
                                        })
                                    }
                                </View>
                            </ScrollView>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    !isLoading && (
                                        <>
                                            <View style={{ flexDirection: 'column' }}>
                                                {
                                                    listBuku.length == 0 && (
                                                        <NoData>Tidak ada data buku</NoData>
                                                    )
                                                }
                                                {
                                                    listBuku.map((item, iBook) => {
                                                        return (
                                                            <>
                                                                <View style={{ flexDirection: 'column', backgroundColor: color.white, padding: 12, borderRadius: 12, flex: 1, overflow: 'hidden' }}>
                                                                    <Text style={[styles.txtGlobalBold, { fontSize: 16, marginBottom: 10 }]}>{item.judul}</Text>
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
                                                                                navigation.navigate("EditBukuPerpus", { params: item })
                                                                            }} style={{ marginVertical: 12 }}>
                                                                                <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Edit</Text>
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
                                                <View style={{ height: 20 }} />
                                            </View>
                                        </>
                                    )
                                }
                                {
                                    isLoading && (
                                        <>
                                            <ActivityIndicator size="small" color={color.primary} />
                                            <Text style={[styles.txtGlobalBold, { color: color.primary, alignSelf: 'center' }]}>loading data</Text>
                                        </>
                                    )
                                }
                            </ScrollView>
                        </View>
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