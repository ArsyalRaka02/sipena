import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailPPDB(props) {
    const navigation = useNavigation()

    const { params } = props.route.params

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {

    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Detail</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 16, flexDirection: 'column' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.txtGlobal]}>Nama : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.nama_lengkap ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.txtGlobal]}>Tanggal Pendaftaran : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.tanggal_pendaftaran ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.txtGlobal]}>Tanggal Lahir : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.tanggal_lahir ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.txtGlobal]}>Jenis Kelamin : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.jenis_Kelamin ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.txtGlobal]}>Nama Ayah : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.nama_bapak ?? " - "}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.txtGlobal]}>Nama Ibu : </Text>
                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{params?.nama_ibu ?? " - "}</Text>
                        </View>
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
    txtGlobal: { fontSize: 13, fontFamily: fonts.inter },
    txtGlobalBold: { fontSize: 15, fontFamily: fonts.interBold },
}
