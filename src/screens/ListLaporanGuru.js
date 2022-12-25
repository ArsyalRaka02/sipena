import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import NoData from '../components/NoData'
import { HttpRequest } from '../utils/http'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListLaporanGuru(props) {
    const navigation = useNavigation()

    const [list, setList] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        HttpRequest.laporanGuru().then((res) => {
            setList(res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Error Dari rest api")
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
                    <Text style={styles.txtHeader}>List Guru</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            list.length == 0 && (
                                <NoData>Tidak ada list</NoData>
                            )
                        }
                        {
                            list.length > 0 && (
                                list.map((item, iList) => {
                                    return (
                                        <>
                                            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12, alignItems: 'center' }}>
                                                {
                                                    item.is_walikelas == "Y" && (
                                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                                            <Text style={[styles.txtGlobalBold, { flex: 1, color: color.primary }]}>Wali Kelas</Text>
                                                            <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama_lengkap}</Text>
                                                        </View>
                                                    )
                                                }
                                                {
                                                    item.is_walikelas != "Y" && (
                                                        <View style={{ flexDirection: 'column', flex: 1 }}>
                                                            <Text style={[styles.txtGlobalBold, { flex: 1, color: color.primary }]}>Guru</Text>
                                                            <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama_lengkap}</Text>
                                                        </View>
                                                    )
                                                }
                                                {/* <Text style={[styles.txtGlobalBold, { marginHorizontal: 10 }]}>{item.kelas}</Text> */}
                                            </View>
                                            <View style={{ height: 20 }} />
                                        </>
                                    )
                                })
                            )
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