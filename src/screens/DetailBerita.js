import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import NoData from '../components/NoData'
import { HttpRequest } from '../utils/http'
import app from '../config/app'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailBerita(props) {
    const navigation = useNavigation()
    const { params, jenis } = props.route.params
    const [listBerita, setListBerita] = useState([])
    const _scrollView = useRef(null)

    useEffect(() => {
        if (params) {
            loadBerita()
        }
    }, [params])

    const loadBerita = useCallback(async () => {
        try {
            let data = await HttpRequest.listBerita(jenis)
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBerita(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBerita([])
            }
        } catch (error) {
            Toast.showError("Server error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listBerita, jenis])

    const loadBeritaPush = useCallback(async (value) => {
        try {
            let data = await HttpRequest.listBerita(value)
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBerita(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBerita([])
            }
        } catch (error) {
            Toast.showError("Server error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listBerita, jenis])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail Berita</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ backgroundColor: color.white, flexDirection: 'column', borderRadius: 12, padding: 20 }}>
                            <View style={{ height: SCREEN_HEIGHT / 7, width: "40%", overflow: 'hidden', borderRadius: 12 }}>
                                <Image source={{ uri: app.BASE_URL_PICTURE + params.foto }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                            </View>
                            <Text style={[styles.txtGlobalBold, { marginVertical: 12 }]}>{params.judul}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                    <Ionicons name="time-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                    <Text style={[styles.txtGlobal]}>{moment(params.tanggal).format("DD MMMM YYYY")}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                                    <Ionicons name="eye-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                    <Text numberOfLines={2} style={[styles.txtGlobal]}>{params.total_views}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons name="book-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                    <Text numberOfLines={2} style={[styles.txtGlobal]}>{params.kelas_id}</Text>
                                </View>
                            </View>
                            <Text style={[styles.txtGlobal, { fontSize: 12 }]}>{params.deskripsi}</Text>
                        </View>
                    </ScrollView>

                    <View style={{ flexDirection: 'row', marginVertical: 12 }}>
                        <Text style={[styles.txtGlobalBold]}>Berita lainnya</Text>
                    </View>

                    {/* berita */}
                    {
                        listBerita.length == 0 && (
                            <>
                                <NoData>Tidak ada berita</NoData>
                            </>
                        )
                    }
                    <View style={{ flexDirection: "row" }}>
                        <ScrollView ref={_scrollView} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {
                                    listBerita.length > 0 && (
                                        listBerita.map((item, iBerita) => {
                                            return (
                                                <>
                                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                                        loadBeritaPush(jenis)
                                                        _scrollView.current?.scrollTo({
                                                            y: 0,
                                                            animated: false,
                                                        })
                                                    }} style={{ backgroundColor: color.white, padding: 8, width: SCREEN_WIDTH / 2.0, flexDirection: 'column', borderRadius: 12 }}>
                                                        <View style={{ height: SCREEN_HEIGHT / 7, overflow: 'hidden', borderRadius: 12 }}>
                                                            <Image source={{ uri: app.BASE_URL_PICTURE + item.foto }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                                                        </View>
                                                        <View style={{ marginVertical: 12 }}>
                                                            <Text style={[styles.txtGlobalBold, { marginBottom: 6 }]}>{item.judul} </Text>

                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="time-outline" size={18} color={color.black} style={{ marginRight: 8 }} />
                                                                <Text style={[styles.txtGlobal]}>{moment(item.tanggal).format("DD MMMM YYYY")}</Text>
                                                            </View>

                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Ionicons name="eye-outline" size={18} color={color.black} style={{ marginRight: 8, alignSelf: 'flex-start' }} />
                                                                <Text style={[styles.txtGlobal]}>{item.total_views}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <View style={{ width: 20 }} />
                                                </>
                                            )
                                        })
                                    )
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView >
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
    txtGlobal: { fontSize: 13, fontFamily: fonts.inter, color: color.black },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold, color: color.black },
}
