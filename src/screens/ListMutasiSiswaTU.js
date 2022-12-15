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

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListMutasiSiswaTU(props) {
    const navigation = useNavigation()

    const [list, setList] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = useCallback(() => {
        HttpRequest.listMutasiSiswa().then((res) => {
            let data = res.data
            setList(data)
            console.log('ini adalah data', data)
        }).catch((err) => {
            Toast.showError("err", err, err.response)
        })
    }, [list])

    const Delete = useCallback((value) => {
        HttpRequest.hapusMutasi(value).then((res) => {
            Toast.showSuccess("Berhasil hapus mutasi siswa")
            setTimeout(() => {
                navigation.goBack()
            }, 300)
        }).catch((err) => {
            Toast.showError("err server")
        })
    })

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Mutasi Siswa</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <ScrollView>
                        {
                            list.map((item, iTem) => {
                                return (
                                    <>
                                        <View style={{ backgroundColor: color.white, padding: 20, borderRadius: 12 }}>
                                            <Text style={[styles.txtGlobalBold, { color: color.black }]}>{item.nama_lengkap}</Text>
                                            <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>Status: </Text>
                                                    <Text>{item.status}</Text>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={[styles.txtGlobalBold, { color: color.black }]}>NIS: </Text>
                                                    <Text>{item.nisn ?? "-"}</Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                Delete(item.id)
                                            }} style={{ marginVertical: 12 }} >
                                                <Text style={[styles.txtGlobalBold, { color: color.danger, textAlign: 'right' }]}>Delete</Text>
                                            </TouchableOpacity>
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

