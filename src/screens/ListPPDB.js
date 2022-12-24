import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import Toast from '../components/Toast'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListPPDB(props) {
    const navigation = useNavigation()

    const btnSave = useCallback((value) => {
        HttpRequest.insertActivePPDB(value).then((res) => {
            let data = res.data
            let isValid = ''
            if (value == 1) {
                isValid = "Aktif"
            }
            if (value == 0) {
                isValid = "Non-Aktif"
            }
            if (data.status == responseStatus.INSERT_SUKSES) {
                return Alert.alert("Informasi", "Berhasil" + " " + isValid)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                return Alert.alert("Informasi", "Error : " + `${data.message}`)
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server Err:")
            console.log("err", err, err.response)
        })
    }, [])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>PPDB</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Button onPress={() => {
                        btnSave(1)
                    }}>
                        Aktifkan PPBD
                    </Button>
                    <View style={{ height: 20 }} />
                    <Button onPress={() => {
                        btnSave(0)
                    }}>
                        Non-Aktifkan PPBD
                    </Button>
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
