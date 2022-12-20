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
import { round } from 'lodash'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function RaportWaliKelas(props) {
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
        let kelas_id = user.kelas.id
        HttpRequest.nilaiPembelajaranWaliKelasDefault(kelas_id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListRaport(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            console.log("res rapoer", res.data)
        }).catch((err) => {
            Toast.showError("Server Er:")
            console.log("ini err ganjil", err, err.response)
        })
    }, [listRaport])

    const btnTampilGanjil = useCallback(() => {
        let kelas_id = user.kelas.id
        HttpRequest.accNilaiPembelajaranWaliKelas(kelas_id, "Ganjil").then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess(`${res.data.message}`)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
        }).catch((err) => {
            Toast.showError("Server Err ganjil:")
            console.log("ini err ganjil", err, err.response)
        })
    }, [user])

    const btnTampilGenap = useCallback(() => {
        let kelas_id = user.kelas.id
        HttpRequest.accNilaiPembelajaranWaliKelas(kelas_id, "Genap").then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                Toast.showSuccess(`${res.data.message}`)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
        }).catch((err) => {
            Toast.showError("Server Err genap:")
            console.log("ini err ganjil", err, err.response)
        })
    }, [user])




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
                        <Text style={[styles.txtGlobalBold, { color: color.primary, fontSize: 14 }]}>{user?.kelas.nama}</Text>
                    </View>
                    <View style={{ height: 20 }} />
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
                                        <View style={{ backgroundColor: color.white, padding: 20, flexDirection: 'row', borderTopEndRadius: 12, borderTopStartRadius: 12, alignItems: 'center' }}>
                                            <Text style={[styles.txtGlobalBold, { fontSize: 12, flex: 1, color: color.black }]}>{item.nama_siswa}</Text>
                                            <TouchableOpacity activeOpacity={1} onPress={() => {
                                                navigation.navigate("RaportWaliKelasDetail", { params: item.siswa_id, item: item })
                                            }}>
                                                <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.primary }]}>Lihat Detail</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ height: 20 }} />
                                    </>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'column', paddingHorizontal: 20, backgroundColor: color.white }}>
                    <Button
                        onPress={() => {
                            btnTampilGanjil()
                        }}
                    >
                        Tampilkan Raport Semester Ganjil
                    </Button>
                    <View style={{ height: 20 }} />
                    <Button
                        onPress={() => {
                            btnTampilGenap()
                        }}
                    >
                        Tampilkan Raport Semester Genap
                    </Button>
                    <View style={{ height: 20 }} />
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
