import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, ToastAndroid, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast';
import Rupiah from '../utils/Rupiah'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function KeuanganSPPTU(props) {
    const navigation = useNavigation()
    const [listData, setListData] = useState([])

    useEffect(() => {
        loadList()
    }, [])

    const loadList = useCallback(() => {
        HttpRequest.listKeuanganSpp().then((res) => {
            setListData(res.data)
            console.log("ini ers keuangan", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
            Alert.alert("Informasi", "Error dari server")
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
                    <Text style={styles.txtHeader}>Keuangan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listData.length == 0 && (
                                <>
                                    <NoData>Tidak ada list keuangan sekolah</NoData>
                                </>
                            )
                        }
                        {
                            listData.map((item) => {
                                return (
                                    <>
                                        <View style={{ flexDirection: 'column', backgroundColor: color.white, padding: 12, borderRadius: 12 }}>
                                            <Text style={[styles.txtHeader, { color: color.primary, fontSize: 16, marginBottom: 12 }]}>Kategori: {item.ketegorinama}</Text>
                                            <Text style={[styles.txtHeader, { color: color.black, fontSize: 14 }]}>Siswa: {item.nama_lengkap}</Text>
                                            <Text style={[styles.txtHeader, { color: color.black, fontSize: 14 }]}>Kelas: {item.kelasnama}</Text>
                                            <Text style={[styles.txtGlobalBold, { color: color.black, paddingVertical: 4, fontSize: 13 }]}>Keterangan: {item.keterangan}</Text>
                                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 13 }]}>Nominal: {Rupiah.format(item.nominal)}</Text>
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
