import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function AnggotaOsis(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Anggota Osis</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {/* <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconName={"search-outline"}
                        placeholder="Nama Anggota"
                    /> */}
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
            nama: "Apin",
            kelas: "10 IPA 2"
        },
        {
            nama: "Arsyal",
            kelas: "10 IPA 2"
        },
        {
            nama: "Falah",
            kelas: "10 IPA 2"
        },
    ]
    return (
        <>
            {
                data.map((item, iList) => {
                    return (
                        <>
                            <View style={{ flexDirection: 'row', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 18, }}>
                                <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.nama}</Text>
                                <Text style={[styles.txtGlobal]}>Kelas {item.kelas}</Text>
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
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold }
}