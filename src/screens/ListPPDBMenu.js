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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPPDBMenu(props) {
    const navigation = useNavigation()

    const [list, setList] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        HttpRequest.ppdbList().then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setList(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            console.log("res ppdb", res.data.data)
        }).catch((err) => {
            Toast.showError("Server Err: ")
            console.log("err loaddata", err, err.response)
        })
    }, [list])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Jadwal</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Text style={[styles.txtGlobalBold, { fontSize: 16, marginBottom: 20 }]}>Laporan Pendaftaran PPDB</Text>
                    {
                        list.length == 0 && (
                            <>
                                <NoData>Tidak ada data</NoData>
                            </>
                        )
                    }
                    {
                        list.length > 0 && (
                            list.map((item, index) => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 16, flexDirection: 'row' }}>
                                            <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.username}</Text>
                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                navigation.navigate("DetailPPDB", { params: item })
                                            }}>
                                                <Text style={[styles.txtGlobal, { color: color.primary }]}>Lihat Detail</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        )
                    }
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
