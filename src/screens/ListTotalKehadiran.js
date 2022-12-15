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
import { useSelector } from 'react-redux'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListTotalKehadiran(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        let id = user.data.id
        HttpRequest.listKehadiran(id).then((res) => {
            setTotal(res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [user, total])
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
                        <Text style={[styles.txtGlobalBold, { color: color.black }]}>Total Kehadiran</Text>
                        <View style={{ flexDirection: 'row' }}>
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
                        </View>
                    </View>
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
