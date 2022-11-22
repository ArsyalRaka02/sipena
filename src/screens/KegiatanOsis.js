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

export default function KegiatanOsis(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kegiatan Ekstrakulikuler</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconName={"search-outline"}
                        placeholder="Nama Kegiatan"
                    />
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
    let data = [
        {
            nama: "Membuat Agenda Lomba IT Sport Antar Kelas",
            jadwal_awal: "07.00",
            jadwal_akhir: "22.00",
            tanggal: "2022-12-22"
        },
        {
            nama: "Membuat Agenda Lomba IT Sport Antar Kelas",
            jadwal_awal: "07.00",
            jadwal_akhir: "22.00",
            tanggal: "2022-11-22"
        },
        {
            nama: "Membuat Agenda Lomba IT Sport Antar Kelas",
            jadwal_awal: "07.00",
            jadwal_akhir: "22.00",
            tanggal: "2022-10-22"
        },
    ]
    return (
        <>
            {
                data.map((item, iList) => {
                    return (
                        <>
                            <View style={{ flexDirection: 'column', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
                                <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama}</Text>
                                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                    <Text style={[styles.txtGlobal, { flex: 1 }]}>{item.tanggal}</Text>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <Ionicons name="time-outline" size={20} color={color.black} />
                                        <Text style={[styles.txtGlobal]}>{item.jadwal_awal}</Text>
                                        <Text style={[styles.txtGlobal]}> - </Text>
                                        <Text style={[styles.txtGlobal]}>{item.jadwal_akhir}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 20 }} />
                        </>
                    )
                })
            }
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

