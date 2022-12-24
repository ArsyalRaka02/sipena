import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, ActivityIndicator, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import app from '../config/app'
import Toast from '../components/Toast'
import NoData from '../components/NoData'
import { setObjBuku } from '../store/actions'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { useDispatch, useSelector } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function Perpustakaan(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const dispatch = useDispatch();
    const [listKategori, setListKategori] = useState([])
    const [selectedKategori, setSelectedKategori] = useState(null)
    const [listBuku, setListBuku] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [arr, setArr] = useState([])

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
            Alert.alert("Informasi", "Server err dari api")
            console.log("ini adalah list beita", err)
        })
    }, [listBuku, selectedKategori])

    const loadKatalogKategori = useCallback(async () => {
        try {
            let data = await HttpRequest.kategoriBuku()
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListKategori(data.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${data.data.message}`)
                setListKategori([])
            }
        } catch (error) {
            Alert.alert("Informasi", "Server err dari api")
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
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                    <Text style={[styles.txtHeader, { flex: 1 }]}>Perpustakaan</Text>
                    {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                            navigation.navigate("KeranjangDetailBuku")
                        }} style={{ backgroundColor: color.primary, paddingHorizontal: 20, paddingVertical: 16, borderRadius: 12, marginRight: 12, alignItems: 'center', justifyContent: 'center' }}>
                            <SimpleLineIcons name="handbag" size={18} color={color.white} style={{ alignSelf: 'center' }} />
                        </TouchableOpacity>
                    </View> */}
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
                    <ScrollView>
                        <View>
                            <Text style={[styles.txtGlobalBold, { marginTop: 12, color: color.black }]}>Kategori Buku</Text>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
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
                            </ScrollView>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {
                                    !isLoading && (
                                        <>
                                            <View style={{ flexDirection: 'row', width: SCREEN_WIDTH, flexWrap: 'wrap', overflow: 'hidden' }}>
                                                {
                                                    listBuku.map((item, iBook) => {
                                                        return (
                                                            <>
                                                                {/* {iBook == 0 && <View style={{ width: 30 }} />} */}
                                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                                    arr.push(item)
                                                                    dispatch(setObjBuku(arr));
                                                                    navigation.navigate("DetailPerpustakaan", { params: item })
                                                                }} key={iBook} style={{ flexDirection: 'column', alignItems: 'center' }}>
                                                                    <View style={{ height: SCREEN_HEIGHT / 6.3, width: SCREEN_WIDTH / 4 }}>
                                                                        <Image source={{ uri: app.BASE_URL_PICTURE + item.foto }} style={{ height: "100%", width: "100%", borderRadius: 12 }} resizeMode={"cover"} />
                                                                    </View>
                                                                    <Text numberOfLines={1} style={[styles.txtGlobalBold, { fontSize: 15, color: color.black, width: 70, }]}>{item.judul}</Text>
                                                                    <Text style={[styles.txtGlobal, { fontSize: 13, marginBottom: 20 }]}>{item.author}</Text>
                                                                </TouchableOpacity>
                                                                <View style={{ width: 30 }} />
                                                                {/* {iBook != 1 && <View style={{ width: 30 }} />} */}
                                                                {/* {iBook == 0 && <View style={{ width: 10, backgroundColor: color.black }} />} */}
                                                            </>
                                                        )
                                                    })
                                                }
                                                {
                                                    listBuku.length == 0 && (
                                                        <NoData>Tidak ada list buku</NoData>
                                                    )
                                                }
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
