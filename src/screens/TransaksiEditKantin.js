import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import Rupiah from '../utils/Rupiah'
import Button from '../components/Button'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function TransaksiEditKantin(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    const [keterangan, setKeterangan] = useState(params.keterangan)
    const [isLoading, setIsloading] = useState(false)

    const btnSave = useCallback(() => {
        if (keterangan == "") {
            return Toast.showError("keterangan tidak boleh kosong")
        }
        setIsloading(true)
        HttpRequest.editKantin(params.id, keterangan).then((res) => {
            Toast.showSuccess("Berhasil Edit")
            setTimeout(() => {
                navigation.goBack()
            }, 300);
            setIsloading(false)
        }).catch((err) => {
            setIsloading(false)
            Toast.showError("Server Err: ")
            console.log("err edit kantin", err, err.response)
        })
    }, [keterangan, params])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Edit Transaksi</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Pembelian Keterangan</Text>
                        <TextInputIcon
                            value={keterangan}
                            onChangeText={setKeterangan}
                        />

                        <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nominal Pembayaran</Text>
                        <TextInputIcon
                            editable={false}
                            value={Rupiah.format(params.harga_total)}
                            wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                        />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button activeOpacity={1} isLoading={isLoading} onPress={() => {
                        btnSave()
                    }} >
                        Simpan
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
