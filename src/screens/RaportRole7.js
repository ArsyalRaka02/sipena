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
import Combobox from '../components/Combobox'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function RaportRole7(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const [listRaport, setListRaport] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [listKelas, setListKelas] = useState([])
    const [selectedKelas, setSelectedKelas] = useState(null)


    useEffect(() => {
        loadData()
        loadKelas()
    }, [])

    const loadData = useCallback(() => {
        let kelas_id = selectedKelas
        setIsLoading(true)
        HttpRequest.nilaiPembelajaranSiswaDefault(kelas_id).then((res) => {
            if (res.data.status == responseStatus.INSERT_SUKSES) {
                setListRaport(res.data.data)
            }
            if (res.data.status == responseStatus.INSERT_GAGAL) {
                Toast.showError(`${res.data.message}`)
            }
            setIsLoading(false)
            console.log("res", res.data)
        }).catch((err) => {
            setIsLoading(false)
            Toast.showError("Server Er:")
            console.log("ini err ganjil", err, err.response)
        })
    }, [listRaport])

    const loadKelas = useCallback(() => {
        HttpRequest.listMapel().then((res) => {
            let status = res.data.status
            if (status == responseStatus.INSERT_SUKSES) {
                let result = res.data.data.map((item) => {
                    return {
                        id: item.id,
                        label: item.nama
                    }
                })
                setListKelas(result)
            }
            if (status == responseStatus.INSERT_GAGAL) {
                Toast.showError("Server Error: ")
                setListKelas([])
            }
            console.log("res kelas", res.data)
        }).catch((err) => {
            console.log("err", err, err.response)
        })
    }, [listKelas])

    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Penilaian</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>

                    <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Pilih Kelas</Text>
                    <Combobox
                        value={selectedKelas}
                        placeholder="Silahkan Pilih Kelas"
                        theme={{
                            boxStyle: {
                                backgroundColor: color.white,
                                borderColor: color.Neutral20,
                            },
                            leftIconStyle: {
                                color: color.Neutral10,
                                marginRight: 14
                            },
                            rightIconStyle: {
                                color: color.Neutral10,
                            },
                        }}
                        jenisIconsRight="Ionicons"
                        iconNameRight="caret-down-outline"
                        showLeftIcons={false}
                        data={listKelas}
                        onChange={(val) => {
                            setSelectedKelas(val);
                        }}
                    />
                    <View style={{ height: 20 }} />
                    <Button loading={isLoading} onPress={() => {
                        if (selectedKelas != null) {
                            loadData()
                        } else {
                            Toast.showError("Pilih kelas terlebih dahulu")
                        }
                    }}>
                        Cari Data
                    </Button>
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
                                    <Text>Masih menunggu respon</Text>
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