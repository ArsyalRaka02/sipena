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

export default function ListRaport(props) {
    const navigation = useNavigation()
    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Raport</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={[styles.childContainer]}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13, color: color.primary }]}>Kelas</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13, color: color.primary }]}>11 IPA 1</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13, color: color.primary }]}>Rata-rata</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13, color: color.primary }]}>80</Text>
                            </View>
                        </View>
                        <View style={{ width: 30 }} />
                        <View style={styles.childContainer}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.txtGlobal]}>Kelas</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13 }]}>11 IPA 1</Text>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.txtGlobal]}>Rata-rata</Text>
                                <Text style={[styles.txtGlobalBold, { fontSize: 13 }]}>80</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 1 }}>
                        <Text style={[styles.txtGlobalBold, { marginVertical: 18 }]}>Nilai Pelajaran</Text>

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
            <View style={{ backgroundColor: color.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12, flexDirection: "row", alignItems: 'center' }}>
                <Text style={[styles.txtGlobalBold, { flex: 1 }]}>Matematika</Text>
                <View style={{ flexDirection: 'row', marginRight: 18 }}>
                    <Text style={[styles.txtGlobal]}>Nilai : </Text>
                    <Text style={[styles.txtGlobalBold]}>80</Text>
                </View>
                <Ionicons name="chevron-down-outline" size={24} color={color.black} />
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
    childContainer: {
        backgroundColor: color.white,
        flexDirection: "row",
        flex: 1,
        borderRadius: 12,
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 12
    },
}
