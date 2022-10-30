import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListAbsen(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Absen</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/images/warning.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Lakukan absen sesuai dengan jadwal hari ini!</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13 }]}>Absensi menggunakan QRCODE</Text>
                        </View>
                    </View>

                    <View style={{ height: 20 }} />

                    <View style={{ flexDirection: 'row', backgroundColor: color.white, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 16 }}>
                        <Text style={[styles.txtGlobalBold, { color: color.black }]}>Total Kehadiran</Text>
                        <View style={{ flex: 1 }} />
                        <Text style={[styles.txtGlobalBold, { color: color.primary }]}>Lihat Sekarang</Text>
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
    txtGlobal: { fontSize: 14, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 16, fontFamily: fonts.interBold },
}
