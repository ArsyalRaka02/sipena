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
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import app from '../config/app'
import { useSelector } from 'react-redux'
import Button from '../components/Button'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function DetailKantin(props) {
    const navigation = useNavigation()
    const { params } = props.route.params
    const user = useSelector(state => state.user);
    // console.log("ini adalah params", params)

    const [detail, setDetail] = useState({})

    const [keterangan, setKeterangan] = useState("")
    const [nominal, setNominal] = useState("")
    const [isLoading, setIsloading] = useState(false)


    useEffect(() => {
        loadKantin()
    }, [])

    const loadKantin = useCallback(() => {
        HttpRequest.getListKantinbyId(params).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setDetail(res.data.data)
            } else {
                Alert.alert("Informasi", "error get detail kantin" + `${res.data.data.message}`)
            }
            console.log("ers", res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err", err, err.response)
        })
    })

    const btnSave = useCallback(() => {
        if (keterangan == "") {
            return Alert.alert("Informasi", "keterangan tidak boleh kosong")
        }
        if (nominal == "") {
            return Alert.alert("Informasi", "Harga tidak boleh kosong/0")
        }
        let data = {
            user_id: user.data.id,
            kantin_id: params,
            keterangan: keterangan,
            harga_total: nominal
        }
        setIsloading(true)
        HttpRequest.bayarKantin(data).then((res) => {
            // Toast.showSuccess("Berhasil Bayar kantin")
            // setTimeout(() => {
            //     navigation.popToTop()
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
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Error dari api")
        })
    }, [keterangan, nominal, user, params])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Bayar Kantin</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        <View style={{ backgroundColor: color.white, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 12, flexDirection: 'row', alignItems: "center" }}>
                            <View style={{ height: 79, width: 79, marginRight: 16 }}>
                                <Image source={{ uri: app.BASE_URL_PICTURE + detail.foto }} style={{ height: "100%", width: "100%" }} resizeMode="cover" />
                            </View>
                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <Text style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, marginBottom: 6 }]}>Nama Kantin</Text>
                                <Text style={[styles.txtGlobal, { fontSize: 13 }]}>{detail.nama}</Text>
                            </View>
                        </View>
                        <View style={{ height: 20 }} />
                        <Text style={styles.label}>Keterangan</Text>
                        <TextInputIcon
                            placeholder="keterangan"
                            value={keterangan}
                            onChangeText={setKeterangan} />
                        <View style={{ height: 20 }} />
                        <Text style={styles.label}>Harga</Text>
                        <TextInputIcon
                            keyboardType="numeric"
                            placeholder="harga"
                            value={nominal}
                            onChangeText={setNominal} />
                    </ScrollView>
                </View>
                <View style={{ backgroundColor: color.white, paddingTop: 40, paddingBottom: 20, paddingHorizontal: 20 }}>
                    <Button
                        loading={isLoading} activeOpacity={1} onPress={() => {
                            btnSave()
                        }}>
                        Bayar Sekarang
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
    label: { fontSize: 14, color: color.black }
}
