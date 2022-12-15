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
import responseStatus from '../utils/responseStatus'
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function KegiatanOsis(props) {
    const navigation = useNavigation()

    const [listKegiatan, setListKegiatan] = useState([])

    useEffect(() => {
        loadKegiatan()
    }, [])

    const loadKegiatan = useCallback(async () => {
        try {
            let data = await HttpRequest.listKegiatanOsis()
            let result = data.data.data
            let status = data.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                setListKegiatan(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("gagal status = 2")
                setListKegiatan([])
            }
            console.log("res kegiatan", result)
        } catch (error) {
            setListKegiatan([])
            Toast.showError("Server Error: ")
            console.log("ini adalah list beita", error)
        }
    }, [listKegiatan])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Kegiatan Ekstrakulikuler</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    {/* <TextInputIcon
                        // containerStyle={{ marginBottom: 10 }}
                        wrapperStyle={{ backgroundColor: color.white, borderWidth: 0, paddingHorizontal: 10 }}
                        jenisIcons={"Ionicons"}
                        iconName={"search-outline"}
                        placeholder="Nama Kegiatan"
                    /> */}
                    <View style={{ height: 20 }} />
                    <ScrollView>
                        <ListCard data={listKegiatan} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

function ListCard({ data }) {
    return (
        <>
            {
                data.length == 0 && (
                    <>
                        <NoData>Tidak ada data</NoData>
                    </>
                )
            }
            {
                data.length > 0 && (
                    data.map((item, iList) => {
                        return (
                            <>
                                <View style={{ flexDirection: 'column', flex: 1, backgroundColor: color.white, borderRadius: 12, padding: 12 }}>
                                    <Text style={[styles.txtGlobalBold, { flex: 1 }]}>{item.kegiatan}</Text>
                                    <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                        <Text style={[styles.txtGlobal, { flex: 1 }]}>{item.tanggal}</Text>
                                        <View style={{ flexDirection: "row", alignItems: 'center' }}>
                                            <Ionicons name="time-outline" size={20} color={color.black} />
                                            <Text style={[styles.txtGlobal]}>{item.jam_mulai}</Text>
                                            <Text style={[styles.txtGlobal]}> - </Text>
                                            <Text style={[styles.txtGlobal]}>{item.jam_selesai}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ height: 20 }} />
                            </>
                        )
                    })
                )
            }
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

