import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from "../components/Button"

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPembayaranBuku(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Pembayaran Buku</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                        <View style={{ height: 79, width: 79, marginRight: 16 }}>
                            <Image source={require("../assets/sipena/bukti-pembayaran.png")} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                        </View>
                        <View style={{ flexDirection: 'column', flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Bukti Pembayaran</Text>
                            <Text style={[styles.txtGlobal, { fontSize: 13, marginBottom: 6 }]}>Usahakan membayar SPP tepat waktu tiap bulannya!</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                navigation.navigate("PembayaranBuku")
                            }}>
                                <Text style={[styles.txtGlobal, { fontSize: 13, color: color.primary }]}>Upload Sekarang</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 20 }} />
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
            <View style={{ flexDirection: 'column', backgroundColor: color.white, padding: 12, borderRadius: 12 }}>
                <Text style={[styles.txtGlobalBold, { marginLeft: 12, }]}>Matematika</Text>
                <View style={{ marginLeft: 12, marginVertical: 2, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>Nominal Pembayaran : </Text>
                        <Text style={[styles.txtGlobalBold]}>230.000</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Text>Status Pembayaran : </Text>
                        <Text style={[styles.txtGlobal]}>Belum</Text>
                    </View>
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

