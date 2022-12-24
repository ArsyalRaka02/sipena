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
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListMutasiSiswaPengawas(props) {
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
            Alert.alert("Informasi", "err", err, err.response)
        })
    }, [list])

    const Delete = useCallback((value) => {
        HttpRequest.hapusMutasi(value).then((res) => {
            // Toast.showSuccess("Berhasil hapus mutasi siswa")
            // setTimeout(() => {
            //     navigation.goBack()
            // }, 300)
            Alert.alert("Informasi", "Berhasil", [
                {
                    text: "Oke", onPress: () => {
                        setTimeout(() => {
                            navigation.goBack()
                        }, 300);
                    }
                }
            ])
        }).catch((err) => {
            Alert.alert("Informasi", "err server")
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
                            list.length == 0 && (
                                <>
                                    <NoData>Tidak ada data</NoData>
                                </>
                            )
                        }
                        {
                            list.map((item, iTem) => {
                                return (
                                    <>
                                        <TouchableOpacity onPress={() => {
                                            navigation.navigate("ListMutasiSiswaDetailTU", { params: item.id })
                                        }} style={{ backgroundColor: color.white, padding: 20, borderRadius: 12 }}>
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
                                            {/* <View style={{ flexDirection: 'row' }}>
                                                <View style={{ flex: 1 }} />
                                                <TouchableOpacity activeOpacity={1} onPress={() => {
                                                    Delete(item.id)
                                                }} style={{ marginVertical: 12, padding: 4 }} >
                                                    <Text style={[styles.txtGlobalBold, { color: color.danger, textAlign: 'right' }]}>Delete</Text>
                                                </TouchableOpacity>
                                            </View> */}
                                        </TouchableOpacity>
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

