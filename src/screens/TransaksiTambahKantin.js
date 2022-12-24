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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function TransaksiTambahKantin(props) {
    const navigation = useNavigation()

    const [keterangan, setKeterangan] = useState("")
    const [nominal, setNominal] = useState("")
    const [isLoading, setIsloading] = useState(false)

    const btnSave = useCallback(() => {
        if (keterangan == "") {
            return Alert.alert("Informasi", "keterangan tidak boleh kosong")
        }
        if (nominal == "") {
            return Alert.alert("Informasi", "keterangan tidak boleh kosong")
        }
        setIsloading(true)
        let data = {
            keterangan: keterangan,
            nominal: nominal
        }
        HttpRequest.tambahKantin(data).then((res) => {
            // Toast.showSuccess("Berhasil tambah pembelian")
            // setTimeout(() => {
            //     navigation.goBack()
            // }, 300);
            Alert.alert("Informasi", "Berhasil", [
                {
                    text: "Oke", onPress: () => {
                        setTimeout(() => {
                            navigation.goBack()
                        }, 300);
                    }
                }
            ])
            setIsloading(false)
            console.log("ini adalah", res)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("err edit kantin", err, err.response)
        })
    }, [keterangan, nominal])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Tambah Transaksi</Text>
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
                            keyboardType="numeric"
                            value={nominal}
                            onChangeText={setNominal}
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
