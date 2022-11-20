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

const listMenu = [
    {
        name: "Kegiatan OSIS",
        page: "KegiatanOsis",
        image: require("../assets/sipena/user-edit.png")
    },
    {
        name: "Daftar OSIS",
        page: "KegiatanOsis",
        image: require("../assets/sipena/profile-add.png")
    },
    {
        name: "Anggota OSIS",
        page: "KegiatanOsis",
        image: require("../assets/sipena/profile-2user.png")
    },
]

export default function ListOsis(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Jadwal</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {
                        listMenu.map((item, iList) => {
                            return (
                                <>
                                    <View style={{ backgroundColor: color.white, borderRadius: 12, flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 20 }}>
                                        <View style={{ height: 24, width: 24, marginHorizontal: 12 }}>
                                            <Image source={item.image} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                                        </View>
                                        <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black }]}>{item.name}</Text>
                                    </View>
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
    txtGlobal: { fontSize: 14, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 16, fontFamily: fonts.interBold },
}