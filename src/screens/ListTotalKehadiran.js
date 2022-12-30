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
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListTotalKehadiran(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [total, setTotal] = useState(0)
    const [listAbsen, setListAbsen] = useState([])

    useEffect(() => {
        loadData()
        loadListKeterangan()
    }, [])

    const loadData = useCallback(() => {
        let id = user.data.id
        HttpRequest.listKehadiran(id).then((res) => {
            setTotal(res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [user, total])

    const loadListKeterangan = useCallback(() => {
        HttpRequest.listAbsenByUserID(user.id).then((res) => {
            console.log("ini adalah list", res.data)
            setListAbsen(res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server error dari api")
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
                    <Text style={styles.txtHeader}>Total Kehadiran</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 12 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, flex: 1 }]}>Total Kehadiran</Text>

                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{total}</Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: "column", alignItems: 'center', marginVertical: 12, flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>Hadir</Text>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>{total}</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: 'center', marginVertical: 12, flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>Sakit</Text>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>0</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: 'center', marginVertical: 12, flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>Izin</Text>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>0</Text>
                            </View>
                            <View style={{ flexDirection: "column", alignItems: 'center', marginVertical: 12, flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>Alpha</Text>
                                <Text style={[styles.txtGlobalBold, { color: color.black }]}>0</Text>
                            </View>
                        </View> */}
                    </View>
                    <View style={{ height: 20 }} />
                    {
                        listAbsen.length == 0 && (
                            <NoData>Tidak ada list</NoData>
                        )
                    }
                    {
                        listAbsen.length > 0 && (
                            listAbsen.map((item, iList) => {
                                return (
                                    <>
                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                            navigation.navigate("DetailPegawaiAbsen", { params: item })
                                        }} style={{ flexDirection: 'row', backgroundColor: color.white, padding: 18, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                                            <Text style={[styles.txtGlobalBold, { fontSize: 12, color: color.black }]}>{item.jadwal_hari}</Text>
                                            <Text style={[styles.txtGlobalBold, { fontSize: 15, color: color.black, flex: 1, textAlign: 'center' }]}>{moment(item.created_at).format("DD MMM YYYY")}</Text>
                                            <Text style={[styles.txtGlobalBold, { fontSize: 12, color: color.black }]}>{item.is_izin == "Y" ? "Izin" : "Hadir"}</Text>
                                        </TouchableOpacity>
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
