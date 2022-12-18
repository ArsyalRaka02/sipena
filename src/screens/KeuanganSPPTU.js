import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, ToastAndroid } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast';

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
            Toast.showError("Server Err")
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
                            listData.map((item) => {
                                return (
                                    <>
                                        <View style={{ flexDirection: 'column', backgroundColor: color.white, padding: 12, borderRadius: 12 }}>
                                            <Text style={[styles.txtHeader, { color: color.black }]}>Siswa: {item.siswa_id}</Text>
                                            <Text style={[styles.txtGlobalBold, { color: color.black, paddingVertical: 4, fontSize: 13 }]}>Keterangan: {item.keterangan}</Text>
                                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 13 }]}>Nominal: {item.nominal}</Text>
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
