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

const menu = [
    {
        name: 'Peminjaman Fasilitas',
        icon: "reader-outline",
        page: "ListSemuaPeminjamFasilitas"
    },
    {
        name: 'List Fasilitas',
        icon: "reader-outline",
        page: "ListFasilitasTU"
    },
    {
        name: 'Keuangan Sekolah',
        icon: "reader-outline",
        page: "KeuanganSPPTU"
    },
    {
        name: 'Mutasi Siswa',
        icon: "reader-outline",
        page: "ListMutasiSiswaTU"
    },
    {
        name: 'Penerimaan Siswa Baru',
        icon: "reader-outline",
        page: "ListPPDB"
    },
    {
        name: 'Kartu Pelajar',
        icon: "reader-outline",
        page: "ListKartuPelajarTU"
    },
]

export default function ListTataUsaha(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tata Usaha</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {
                        menu.map((item, iMenu) => {
                            return (
                                <>
                                    <TouchableOpacity activeOpacity={1} onPress={() => {
                                        navigation.navigate(item.page)
                                    }} style={{ flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12, backgroundColor: color.white }}>
                                        <Ionicons name={item.icon} size={24} color={color.primary} />
                                        <Text style={[styles.txtGlobalBold, { marginLeft: 12, color: color.black }]}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <View style={{ height: 20 }} />
                                </>
                            )
                        })
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

