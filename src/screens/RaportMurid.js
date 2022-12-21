import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import { HttpRequest } from '../utils/http'
import Toast from '../components/Toast'
import responseStatus from '../utils/responseStatus'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function RaportMurid(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [listRaport, setListRaport] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [selected, setSelected] = useState(false)
    const [selectedI, setSelectedI] = useState(null)


    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        let siswa_id = user.data.id
        HttpRequest.nilaiPembelajaranSiswaDefault(siswa_id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListRaport(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            console.log("ini res raport", res.data)
        }).catch((err) => {
            Toast.showError("Server Er:")
            console.log("ini err ganjil", err, err.response)
        })
    }, [listRaport])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Raport Siswa</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ backgroundColor: color.primaryRGBA, padding: 20, borderRadius: 12, alignItems: 'center' }}>
                        <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 14 }]}>{user?.nama}</Text>
                    </View>
                    <ScrollView>
                        {
                            listRaport.length == 0 && (
                                <NoData>Tidak ada data raport</NoData>
                            )
                        }
                        {
                            listRaport.map((item, iRaport) => {
                                return (
                                    <>
                                        <TouchableOpacity activeOpacity={1} onPress={() => {
                                            setSelected(true)
                                            setSelectedI(iRaport)
                                        }}>
                                            <View style={{ backgroundColor: color.white, padding: 20, flexDirection: 'row', borderTopEndRadius: 12, borderTopStartRadius: 12, alignItems: 'center' }}>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 12, flex: 1, color: color.black }]}>{item.nama_mapel}</Text>
                                                <Text style={[styles.txtGlobal, { fontSize: 12 }]}>Nilai: </Text>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 12, color: color.black, marginRight: 10 }]}>{item.nilai_rata}</Text>
                                                <Ionicons name="chevron-down-outline" size={24} color={color.black} />
                                            </View>
                                            {
                                                selected == false && (
                                                    <View style={{ height: 20 }} />
                                                )
                                            }
                                            {
                                                selected == true && (
                                                    <>
                                                        {
                                                            selectedI == iRaport && (
                                                                <>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, alignContent: 'center', backgroundColor: color.white, borderBottomEndRadius: 12, borderBottomStartRadius: 12, borderTopWidth: 1, borderTopColor: color.black }}>
                                                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                            <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-Harian</Text>
                                                                            <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.ulangan_harian}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                            <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-Tugas</Text>
                                                                            <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nilai_tugas}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                            <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-UTS</Text>
                                                                            <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nilai_uts}</Text>
                                                                        </View>
                                                                        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                                                                            <Text style={[styles.txtGlobal, { fontSize: 12 }]}>N-UAS</Text>
                                                                            <Text style={[styles.txtGlobalBold, { fontSize: 16 }]}>{item.nilai_uas}</Text>
                                                                        </View>
                                                                    </View>
                                                                </>
                                                            )
                                                        }
                                                        <View style={{ height: 20 }} />
                                                    </>
                                                )
                                            }
                                        </TouchableOpacity>
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
