import React, { useCallback, useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native'
import moment from 'moment'
import color from '../utils/color'
import HeaderBack from '../components/HeaderBack'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import TextInputIcon from '../components/TextInputIcon'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { fonts } from '../utils/fonts'
import { useSelector } from 'react-redux'
import { HttpRequest } from '../utils/http'
import responseStatus from '../utils/responseStatus'
import Combobox from '../components/Combobox'
import DatePicker from '../components/DatePicker'
import RoleResponse from '../utils/RoleResponse'
import Toast from '../components/Toast'
import NoData from '../components/NoData'

const SCREEN_HEIGHT = Dimensions.get("window").height
const SCREEN_WIDTH = Dimensions.get("window").width

export default function ListAbsenMonitoring(props) {
    const navigation = useNavigation()
    const user = useSelector(state => state.user);
    const isFocused = useIsFocused()

    const [selectedKelas, setSelectedKelas] = useState(null)
    const [listKelas, setListKelas] = useState([])
    const [tanggal, setTanggal] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [listAbsen, setListabsen] = useState([])

    useEffect(() => {
        if (isFocused) {
            loadKelas()
        }
    }, [isFocused, tanggal])

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

    const toggleSetDay = useCallback((day) => {
        setTanggal(day)
    }, [tanggal])

    const btnTrigger = useCallback((value) => {
        let isTanggal = moment(tanggal).format("YYYY-MM-DD")
        HttpRequest.listAbsenSiswa(value, isTanggal).then((res) => {
            console.log("ini trigger", res.data)
            // if (res.data.status == RoleResponse.INSERT_SUKSES) {
            //     setListabsen(res.data.data)
            // }
            // if (res.data.status == RoleResponse.INSERT_GAGAL) {
            //     Toast.showError(`${res.data.message}`)
            // }
        }).catch((err) => {
            console.log("trigger", err, err.response)
        })
    }, [tanggal, selectedKelas])


    return (
        <>
            <SafeAreaView style={styles.container}>
                <HeaderBack
                    onBack={() => {
                        navigation.goBack()
                    }}
                >
                    <Text style={styles.txtHeader}>Absen Siswa</Text>
                </HeaderBack>
                <View style={{ padding: 20, flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
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
                                    btnTrigger(val)
                                }}
                            />
                        </View>
                        <View style={{ width: 20 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.txtGlobalBold, { fontSize: 14, color: color.black, marginVertical: 10 }]}>Tanggal</Text>
                            <DatePicker
                                style={{ backgroundColor: color.white }}
                                format='YYYY-MM-DD'
                                displayFormat='DD MMM YYYY'
                                nameLabel="tanggal"
                                value={tanggal}
                                onChange={(tanggal) => {
                                    toggleSetDay(tanggal)
                                }}
                            />
                        </View>
                    </View>
                    <ScrollView>
                        {
                            listAbsen.length == 0 && (
                                <NoData>Tidak ada data</NoData>
                            )
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
