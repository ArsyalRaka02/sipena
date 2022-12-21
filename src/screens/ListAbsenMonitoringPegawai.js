import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Combobox from '../components/Combobox'
import DatePicker from '../components/DatePicker'
import RoleResponse from '../utils/RoleResponse'
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListAbsenMonitoringPegawai(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const isFocused = useIsFocused()

    const [tanggal, setTanggal] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [listAbsen, setListabsen] = useState([])

    useEffect(() => {
        loadData()
    }, [isFocused])

    const loadData = useCallback(() => {
        HttpRequest.listAbsenPegawai().then((res) => {
            // let status = res.data.status
            // if (status == responseStatus.INSERT_SUKSES) {
            setListabsen(res.data)
            // }
            // if (status == responseStatus.INSERT_GAGAL) {
            //     Toast.showError("Server Error: ")
            //     setListabsen([])
            // }
            console.log("res pegawai", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listAbsen])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Absen Pegawai</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listAbsen.length == 0 && (
                                <NoData>Tidak ada data</NoData>
                            )
                        }
                        {
                            listAbsen.map((item, i) => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 16, flexDirection: 'row' }}>
                                            <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama_lengkap}</Text>
                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                navigation.navigate("DetailPegawaiAbsen", { params: item })
                                            }}>
                                                <Text style={[styles.txtGlobal, { color: color.primary }]}>Lihat Detail</Text>
                                            </TouchableOpacity>
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
