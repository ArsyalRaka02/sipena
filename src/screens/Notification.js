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
import Toast from '../components/Toast'
import { useSelector } from 'react-redux'
import NoData from '@febfeb/react-native-dropdown/src/NoData'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

let data = {
    id: "3",
    judul: "Pinjam Fasilitas",
    deskripsi: "Peminjaman fasilitas berhasil di konfirmasi kamu bisa menggunakan fasilitas sekolah sekarang",
    created_at: "2022-12-15",
    user_id: "2",
    is_seen: "Y"
}

export default function Notification(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [listData, setListData] = useState([])

    useEffect(() => {
        laodData()
    }, [])

    const laodData = useCallback(() => {
        HttpRequest.getNotifikasi(user.id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListData(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${res.data.message}`)  
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            Alert.alert("Informasi", "Server err dari api")
        })
    }, [listData])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Notifikasi</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listData.length == 0 && (
                                <>
                                    <NoData>Belum ada notifikasi</NoData>
                                </>
                            )
                        }
                        {
                            listData.map((item) => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
                                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 15 }]}>{item.judul}</Text>
                                            <Text style={[styles.txtGlobal, { color: color.black, fontSize: 13 }]}>{item.deskripsi}</Text>
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
