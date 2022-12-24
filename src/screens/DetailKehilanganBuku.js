import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Rupiah from '../utils/Rupiah'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailKehilanganBuku(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail Kehilangan</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <View style={[{ flexDirection: 'column', backgroundColor: color.white, padding: 18, borderRadius: 8 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black, flex: 1, fontSize: 18, marginBottom: 6 }]}>{params.user_nama}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Buku : </Text>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{params.judul}</Text>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Kategori : </Text>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{params.kategori_nama}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Penulis: </Text>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{params.author}</Text>
                                </View>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Bahasa: </Text>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{params.bahasa}</Text>
                                </View>
                                {/* <TouchableOpacity activeOpacity={1} onPress={() => {
                                    // navigation.navigate("DetailKembalikanBuku", { params: item })
                                }}>
                                    <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 14 }]}>Lihat Detail</Text>
                                </TouchableOpacity> */}
                            </View>
                            <View style={{ flexDirection: 'row', marginVertical: 8, alignItems: 'center' }}>
                                <View style={{ flexDirection: "row", flex: 1 }}>
                                    <Text style={[styles.txtGlobal]}>Halaman: </Text>
                                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{params.total_halaman}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 20 }} />

                        <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 12, }}>
                            <Text style={[styles.txtGlobalBold, { fontSize: 18, color: color.black, marginBottom: 12 }]}>Detail Pembayaran</Text>
                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                <Text style={[styles.txtGlobal]}>Nominal Pembayaran: </Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{Rupiah.format(params.nominal)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                                <Text style={[styles.txtGlobal]}>Tanggal Pembayaran: </Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, fontStyle: "italic", fontWeight: "900" }]}>{moment(params.tanggal_pembayaran).format("MM-DD-YYYY")}</Text>
                            </View>
                        </View>
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
