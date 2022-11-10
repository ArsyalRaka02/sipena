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

export default function ListTabungan(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tabungan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>

                    {/* container */}
                    <View style={{ backgroundColor: color.white, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/sipena/tabungan.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Total Tabungan</Text>
                            <Text style={[styles.txtGlobalBold, { fontSize: 24, marginBottom: 6 }]}>240.000</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }} />

                    {/* container */}
                    <View style={{ backgroundColor: color.white, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/sipena/bukti-pembayaran.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Bukti Pembayaran</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13, marginBottom: 6 }]}>Rajinlah menabung untuk masa depan yang cerah </Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                navigation.navigate("PembayaranTabungan")
                            }}>
                                <Text style={[styles.txtGlobal, { fontSize: 13, color: color.primary }]}>Upload Sekarang</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={[styles.txtGlobalBold, { marginVertical: 12 }]}>Riwayat Tabungan</Text>
                    <ScrollView>
                        <ListCard />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListCard() {
    return (
        <>
            <View style={{ flexDirection: 'row', backgroundColor: color.white, padding: 18, borderRadius: 12, alignItems: 'center' }}>
                <Text style={[styles.txtGlobalBold, { fontSize: 13 }]}>12 September 2022</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.txtGlobal]}>Nominal : </Text>
                    <Text style={[styles.txtGlobalBold, { fontSize: 14 }]}>40.000</Text>
                </View>
            </View>
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

