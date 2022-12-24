import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image, ToastAndroid, Alert } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { HttpRequest } from '../utils/http'
import NoData from '@febfeb/react-native-dropdown/src/NoData'
import Toast from '../components/Toast'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListKartuPelajarTU(props) {
    const navigation = useNavigation()

    const [listData, setListData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        HttpRequest.getKartuDigital().then((res) => {
            setListData(res.data)
        }).catch((err) => {
            Alert.alert("Informasi", "Server err dari api")
            console.log("err kartu pelajar", err, err.response)
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
                    <Text style={styles.txtHeader}>Kartu Pelajar</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            listData.length == 0 && (
                                <>
                                    <NoData>Tidak ada list kartu pelajar</NoData>
                                </>
                            )
                        }
                        {
                            listData.map((item, iList) => {
                                return (
                                    <>
                                        <View style={{ flexDirection: 'column', backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
                                            <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nama_lengkap}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.txtGlobal]}>Alamat: </Text>
                                                    <Text style={[styles.txtGlobalBold]}>{item.alamat}</Text>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.txtGlobal]}>Kelas: </Text>
                                                    <Text style={[styles.txtGlobalBold]}>{item.nama}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }
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
