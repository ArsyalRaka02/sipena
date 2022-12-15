import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import app from '../config/app'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function Perpustakaan(props) {
    const navigation = useNavigation()
    const [listKategori, setListKategori] = useState([])
    const [selectedKategori, setSelectedKategori] = useState([])
    const [listBuku, setListBuku] = useState([])

    useEffect(() => {
        loadKatalogKategori()
        loadBuku()
    }, [])

    const loadBuku = useCallback(async () => {
        try {
            let data = await HttpRequest.katalogBuku()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBuku(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBuku([])
            }
            console.log("res buku", result)
        } catch (error) {
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listBuku])

    const loadKatalogKategori = useCallback(async () => {
        try {
            let data = await HttpRequest.kategoriBuku()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListKategori(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal status = 2")
                setListKategori([])
            }
            console.log("res kategori", result)
        } catch (error) {
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listKategori])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Perpustakaan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {/* <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconColor={color.primary}
                        iconName={"search-outline"}
                        placeholder="Cari Buku (Pengarang/Judul Buku)"
                    /> */}

                    <View>
                        <Text style={[styles.txtGlobalBold, { marginTop: 12, color: color.black }]}>Kategori Buku</Text>
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                            <ListKategori data={listKategori} />
                        </ScrollView>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ListBuku data={listBuku} />
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListKategori({ data }) {
    return (
        <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 20 }}>
            <View style={[{ backgroundColor: color.white, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 }]}>
                <Text style={[styles.txtGlobalBold, { fontSize: 13 }]}>Semua</Text>
            </View>
            <View style={{ marginLeft: 12 }} />
            {
                data.map((item, iList) => {
                    return (
                        <>
                            <View style={[{ backgroundColor: color.white, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 }]}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13 }]}>{item.nama}</Text>
                            </View>
                            <View style={{ marginLeft: 12 }} />
                        </>
                    )
                })
            }
        </View>
    )
}

function ListBuku({ data }) {
    const navigation = useNavigation()
    return (
        <>
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                {
                    data.map((item, iBook) => {
                        return (
                            <>
                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                    navigation.navigate("DetailPerpustakaan", { params: item })
                                }} key={iBook} style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ height: SCREEN_HEIGHT / 6.3, width: SCREEN_WIDTH / 4 }}>
                                        <Image source={{ uri: app.BASE_URL_PICTURE + item.foto }} style={{ height: "100%", width: "100%", borderRadius: 12 }} resizeMode={"contain"} />
                                    </View>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 15, color: color.black }]}>{item.judul}</Text>
                                    <Text style={[styles.txtGlobal, { fontSize: 13 }]}>{item.author}</Text>
                                </TouchableOpacity>
                            </>
                        )
                    })
                }
            </View>
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
