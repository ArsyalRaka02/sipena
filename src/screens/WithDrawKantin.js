import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import Rupiah from '../utils/Rupiah'
import Button from '../components/Button'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function WithDrawKantin(props) {
    const navigation = useNavigation()

    const user = useSelector(state => state.user);
    const [detail, setDetail] = useState({})
    const [nominal, setNominal] = useState("")
    const [keterangan, setKeterangan] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadDetail()
    }, [])

    const loadDetail = useCallback(() => {
        HttpRequest.getListKantinbyId(user.kantin.id).then((res) => {
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                setDetail(res.data.data)
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error: " + `${res.data.message}`)
            }
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kantin", err, err.response)
        })
    }, [detail])

    const btnSave = useCallback(() => {
        if (detail.saldo < nominal) {
            return Alert.alert("Informasi", "saldo kurang dari nominal")
        }
        if (keterangan == "") {
            return Alert.alert("Informasi", "Nomor rekening tidak boleh kosong")
        }
        if (nominal == "") {
            return Alert.alert("Informasi", "Nominal tidak boleh kosong")
        }
        let data = {
            user_id: user.data.id,
            saldo: detail.saldo,
            nominal: nominal,
            keterangan: keterangan
        }
        // console.log('data, ', data)
        setIsLoading(true)
        HttpRequest.withdrawKantin(data).then((res) => {
            let data = res.data
            if (data.status == responseStatus.INSERT_SUKSES) {
                // Toast.showSuccess(`${res.data.message}`)
                // setTimeout(() => {
                //     navigation.goBack()
                // }, 300);
                Alert.alert("Informasi", `${res.data.message}`, [
                    {
                        text: "Oke", onPress: () => {
                            setTimeout(() => {
                                navigation.goBack()
                            }, 300);
                        }
                    }
                ])
            }
            if (data.status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", "Error: " + `${res.data.message}`)
            }
            setIsLoading(false)
        }).catch((err) => {
            setIsLoading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kantin", err, err.response)
        })
    }, [nominal, keterangan])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Withdraw</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Saldo Anda</Text>
                    <TextInputIcon
                        editable={false}
                        value={Rupiah.format(detail.saldo)}
                        wrapperStyle={{ backgroundColor: color.themeGray, borderColor: color.themeGray }}
                    />

                    <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nominal</Text>
                    <TextInputIcon
                        value={nominal}
                        keyboardType="numeric"
                        onChangeText={setNominal}
                    />
                    <Text style={[styles.txtGlobalBold, { fontSize: 16, color: color.black, marginVertical: 12 }]}>Nomor Rekening</Text>
                    <TextInputIcon
                        value={keterangan}
                        keyboardType="numeric"
                        onChangeText={setKeterangan}
                    />
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
