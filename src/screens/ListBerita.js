import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'
import app from '../config/app'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

const listKategori = [
    {
        id: "kelas", nama: "Kelas",
    },
    {
        id: "sekolah", nama: "Sekolah",
    },
]

export default function ListBerita(props) {
    const navigation = useNavigation()

    const [selected, setSelected] = useState(0)
    const [kategoriId, setKategoriId] = useState("kelas")
    const [listBerita, setListBerita] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        loadBerita()
    }, [selected])

    const loadBerita = useCallback(async () => {
        let kategori = kategoriId
        // console.log("ini kategori", kategori)
        try {
            let data = await HttpRequest.listBerita(kategori)
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBerita(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Server Error: ")
                setListBerita([])
            }
            // console.log("ini load Berita", result)
            setIsloading(false)
        } catch (error) {
            setIsloading(false)
            console.log("ini adalah list beita", error)
        }
    }, [listBerita, kategoriId, selected])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Berita</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {
                            listKategori.map((item, iListK) => {
                                return (
                                    <>
                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                            setKategoriId(item.id)
                                            setSelected(iListK)
                                        }} style={{ marginHorizontal: 6, paddingVertical: 12, backgroundColor: selected == iListK ? color.primary : color.white, flex: 1, alignItems: 'center', borderRadius: 12 }}>
                                            <Text style={[styles.txtGlobalBold, { fontSize: 14, color: selected == iListK ? color.white : color.primary }]}>{item.nama}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            })
                        }
                    </View>
                    <View style={{ height: 20 }} />
                    {/* <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconName={"search-outline"}
                        placeholder="Cari Berita"
                    /> */}
                    <View style={{ height: 10 }} />
                    <List data={listBerita} jenis={kategoriId} />
                </View>
            </SafeAreaView>
        </>
    )
}

function List({ data, jenis }) {
    const navigation = useNavigation()
    // const data = [
    //     {
    //         judul: "judul berita",
    //         img: require("../assets/images/no-image.png"),
    //         tanggal: "2020/12/12",
    //     }
    // ]
    return (
        <>
            <ScrollView style={{ paddingVertical: 10 }}>
                {
                    data.length == 0 && (
                        <NoData>tidak ada data berita</NoData>
                    )
                }
                {
                    data.length > 0 && (
                        data.map((item, iData) => {
                            return (
                                <>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        navigation.navigate("DetailBerita", { params: item, jenis: jenis })
                                    }} style={styles.containerList}>
                                        <View style={styles.childImage}>
                                            <Image source={{ uri: app.BASE_URL_PICTURE + item.foto }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                                        </View>
                                        <View style={styles.childContent}>
                                            <Text style={styles.txtGlobalBold}>{item.judul}</Text>
                                            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end' }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="time-outline" size={18} color={color.black} />
                                                    <Text style={[styles.txtGlobal, { fontSize: 12, marginLeft: 4 }]}>{moment(item.tanggal).format("dddd, DD MMM YYYY")}</Text>
                                                </View>
                                                <View style={{ width: 10 }} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Ionicons name="eye-outline" size={18} color={color.black} />
                                                    <Text style={[styles.txtGlobal, { fontSize: 12, marginLeft: 4 }]}>{item.total_views}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ height: 20 }} />
                                </>
                            )
                        })
                    )
                }
            </ScrollView>
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
    txtGlobal: { fontSize: 12, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
    containerList: { backgroundColor: color.white, flexDirection: 'row', padding: 10, borderRadius: 12, alignItems: 'center' },
    childImage: { width: SCREEN_WIDTH / 5, height: SCREEN_HEIGHT / 10, borderRadius: 12, overflow: "hidden" },
    childContent: { flexDirection: 'column', flex: 1, marginLeft: 12 }
}
