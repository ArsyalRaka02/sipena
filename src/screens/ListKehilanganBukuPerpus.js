import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListKehilanganBukuPerpus(props) {
    const navigation = useNavigation()

    const [listBuku, setListBuku] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        setIsLoading(true)
        HttpRequest.kehilanganBuku().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListBuku(res.data.data)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setListBuku([])
            }
            setIsLoading(false)
            console.log("res", res.data.data)
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err)
        })
    }, [listBuku])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kehilangan Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listBuku.map((item, i) => {
                                return (
                                    <>
                                        <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={[styles.txtGlobalBold, { color: color.black, flex: 1, fontSize: 18, marginBottom: 6 }]}>{item.user_nama}</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Buku : </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.judul}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Kategori : </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.kategori_nama}</Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Penulis: </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{item.author}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Bahasa: </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{item.bahasa}</Text>
                                                </View>
                                                {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                                    // navigation.navigate("DetailKembalikanBuku", { params: item })
                                }}>
                                    <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 14 }]}>Lihat Detail</Text>
                                </TouchableOpacity> */}
                                            </View>
                                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                                <View style={{ flexDirection: "row", flex: 1 }}>
                                                    <Text style={[styles.txtGlobal]}>Halaman: </Text>
                                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{item.total_halaman}</Text>
                                                </View>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    navigation.navigate("DetailKehilanganBuku", { params: item })
                                                }}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 14 }]}>Lihat Detail</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }
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