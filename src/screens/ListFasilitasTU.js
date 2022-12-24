import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import Button from '../components/Button'
import responseStatus from '../utils/responseStatus'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListFasilitasTU(props) {
    const navigation = useNavigation()
    const isFocused = useIsFocused()
    const [listData, setListdata] = useState([])
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        if (isFocused) {
            loadData()
        }
    }, [isFocused])

    const loadData = useCallback(async () => {
        try {
            let data = await HttpRequest.listFasilitas()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListdata(result)
                console.log("res", result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Alert.alert("Informasi", `${data.data.message}`)
                setListdata([])
            }
            setIsloading(false)
            console.log("ini adalah list fasilitas", result)
        } catch (error) {
            Alert.alert("Informasi", "Server err dari api")
            setIsloading(false)
            setListdata([])
            console.log("err", error, error.response)
        }
    }, [listData])

    const btnDeleted = useCallback((value) => {
        HttpRequest.deletedListFasilitas(value).then((res) => {
            let result = res.data
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setIsloading(true)
                loadData()
            }
            if (status == responseStatus.INSERT_GAGAL) {
                setIsloading(false)
                Alert.alert("Informasi", "gagal hapus status == 2" + `${result.message}`)
            }
            // console.log("er", res)
        }).catch((err) => {
            setIsloading(false)
            Alert.alert("Informasi", "Server err dari api")
            console.log("error", err, err.response)
        })
    }, [listData])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>List Fasilitas</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <Button activeOpacity={1} onPress={() => {
                        navigation.navigate("FasilitasTambahTU")
                    }}>
                        Tambah
                    </Button>
                    <ScrollView showsVerticalScrollIndicator={true}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingVertical: 20 }}>
                            {
                                listData.map((item, iList) => {
                                    return (
                                        <>
                                            <View style={{ backgroundColor: color.white, width: SCREEN_WIDTH / 4, alignItems: 'center', padding: 12, marginBottom: 12, borderRadius: 12 }}>
                                                <Text numberOfLines={2} style={[styles.txtGlobalBold, { color: color.black, fontSize: 14, textAlign: 'center' }]}>{item.nama}</Text>
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    btnDeleted(item.id)
                                                }}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.danger, fontSize: 12, marginTop: 12 }]}>Hapus</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
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

