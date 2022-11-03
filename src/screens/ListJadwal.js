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

export default function ListJadwal(props) {
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
                    <View style={{ backgroundColor: color.primaryRGBA, alignItems: 'center', flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 20, borderRadius: 12 }}>
                        <Ionicons name={"calendar-outline"} size={24} color={color.primary} />
                        <Text style={[styles.txtGlobalBold, { color: color.primary, marginLeft: 16 }]}>Kelas 10 IPA 1</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            <ListPelajaran />
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListPelajaran() {
    return (
        <>
            <View style={{ marginVertical: 12 }}>
                <Text style={[styles.txtGlobalBold]}>Senin</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 }}>
                <Text>Matematika</Text>
                <View style={{ flex: 1 }} />
                <View style={{ flexDirection: 'row' }}>
                    <Ionicons name="time-outline" size={20} color={color.black} style={{ marginRight: 12 }} />
                    <Text style={[styles.txtGlobal]}>07.00-09.00</Text>
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
